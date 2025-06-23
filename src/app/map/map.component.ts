import {
  booleanAttribute,
  Component,
  input,
  OnInit,
  output,
  model,
  SimpleChanges,
  Input,
  OnDestroy,
  
} from '@angular/core';
import * as L from 'leaflet';
import { GeoPoint } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() height = "100%";
  public points = model<GeoPoint[]>();
  private localPoints: GeoPoint[];
 
  public map: L.Map | undefined;
  public poligon: L.Polygon | undefined;
  public drawing = input(false, { transform: booleanAttribute });

  public route_id = "";


  constructor(
    private route: ActivatedRoute
  ) {
    this.route_id = route.snapshot.routeConfig?.path ?? ""
    this.localPoints = [];
    this.points.subscribe(points => {
      console.log("new points value", points)
      this.localPoints = points ?? [];
      this.drawPoligon()
    })
  }

  ngOnInit() {


  }

  async ngAfterViewInit(){
    this.map = await this.initMap();
      setTimeout(() => {
        this.map?.invalidateSize();
        this.drawPoligon()
      }, 1000);


  }


  

  private async initMap(): Promise<L.Map> {
    let map = L.map('map_'+this.route_id, {
      dragging: true,
      attributionControl: true,
      zoomControl: true,
      scrollWheelZoom: true
    }).setView([51.9193, 10.4301], 13);

   
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    return map.whenReady((event) => {
      return event.target
    })
    
  }


  private getCoordinates(event: any): GeoPoint {
    return new GeoPoint(event.latlng.lat, event.latlng.lng);
  }

  /*addPoint(lat: number, lng: number) {
    console.log(this.points);
  }*/

  private drawPoligon() {
    this.map?.whenReady( () => {
      console.log("Map ready, now drawing")
      console.log(this.localPoints)

      if (this.poligon) {
          this.poligon.removeFrom(this.map!);
      }
      if(this.localPoints && this.localPoints.length > 0) {
        this.poligon = L.polygon(
            this.localPoints.map((x) => [x.latitude, x.longitude])
        ).addTo(this.map!);
      }

        
        if(this.map && this.poligon) this.map!.fitBounds(this.poligon?.getBounds() ?? this.map!.getBounds())
        if (this.drawing()) {
            if(this.map) L.DomUtil.addClass(this.map.getContainer(), 'crosshair-cursor-enabled');

            this.map?.clearAllEventListeners();
            this.map?.on('click', (event) => {
              this.localPoints.push(this.getCoordinates(event));
              this.points.update(val => {
                return this.localPoints
              })
              this.drawPoligon()
            });
          } else {
            if(this.map) L.DomUtil.removeClass(
              this.map.getContainer(),
              'crosshair-cursor-enabled'
            );
          }
      })

  }


  ngOnDestroy() {
    console.log("Destroying")
    this.map?.remove()
  }

}
