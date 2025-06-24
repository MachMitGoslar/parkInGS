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
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() height = '100%';
  @Input() points: GeoPoint[] = [];

  public map: L.Map | undefined;
  public poligon: L.Polygon | undefined;
  public drawing = input(false, { transform: booleanAttribute });
  public centerMarker?: L.Marker;
  public poligonGroup: L.LayerGroup = new L.LayerGroup();
  public positionGroup: L.LayerGroup = new L.LayerGroup();

  public route_id = '';

  constructor(private route: ActivatedRoute, private locationService: LocationService) {
    this.route_id = route.snapshot.routeConfig?.path ?? '';

  }

  ngOnInit() {}

  async ngAfterViewInit() {
    this.map = await this.initMap();
    setTimeout(() => {
      this.map?.invalidateSize();

      this.drawPoligon();
      let bounds = new L.LatLngBounds([
        [51.9193, 10.4301],
        [51.9193, 10.4301],
      ]);
      for (let point of this.points) {
        bounds.extend([point.latitude, point.longitude]);
      }
      this.map?.fitBounds(bounds, {
        maxZoom: 18,

      });
    }, 1000);
  }

  private async initMap(): Promise<L.Map> {
    let map = L.map('map_' + this.route_id, {
      dragging: true,
      attributionControl: true,
      zoomControl: true,
      scrollWheelZoom: true,
    }).setView([51.9193, 10.4301], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    return map.whenReady((event) => {
      this.poligonGroup.addTo(event.target);
      this.positionGroup.addTo(event.target);

      this.locationService.$position.subscribe( value => {
        console.log("Drawing at: ", value)
        this.drawPositionMarker(value)
      })
      if (this.drawing()) {
        event.target.on('move', (event) => {
          this.centerMarker?.remove();
          this.drawCenterMarker(map);
        });
      } else {
        if (this.map)
          L.DomUtil.removeClass(
            this.map.getContainer(),
            'crosshair-cursor-enabled'
          );
      }
    });
  }

  private drawCenterMarker(map: L.Map) {
    let center = map.getCenter();
    let icon = new L.Icon({
      iconUrl: 'assets/imgs/002-location-pin.svg',
      iconSize: [68, 125],
      iconAnchor: [35, 80],
      popupAnchor: [-3, -76],
    });
    this.centerMarker = new L.Marker(center!, {
      icon: icon,
    }).addTo(map);
    this.centerMarker.on('click', (event) => {
    this.points.push(this.getCoordinates(event));
    this.drawPoligon()

      //this.drawPoligon();
    });
  }
    private drawPositionMarker(position: GeoPoint) {
      this.positionGroup.clearLayers();
    let icon = new L.Icon({
      iconUrl: 'assets/imgs/002-location-pin.svg',
      iconSize: [68, 125],
      iconAnchor: [35, 80],
      popupAnchor: [-3, -76],
    });
    new L.Marker([position.latitude, position.longitude], {
      icon: icon,
    }).addTo(this.positionGroup);
    console.log(this.positionGroup)

  }

  private getCoordinates(event: any): GeoPoint {
    return new GeoPoint(event.latlng.lat, event.latlng.lng);
  }

  /*addPoint(lat: number, lng: number) {
    console.log(this.points);
  }*/

  private drawPoligon() {
    this.poligonGroup.clearLayers();
    if (this.points && this.points.length > 0) {
      L.polygon(this.points.map((x) => [x.latitude, x.longitude])).addTo(
        this.poligonGroup
      );
      for (let point of this.points) {
        let circle = new L.Circle([point.latitude, point.longitude], 10, {
          color: 'white',
          radius: 10,
        });
        circle.addTo(this.poligonGroup);
      }
    }

    //if(this.map && this.poligon) this.map!.fitBounds(this.poligon?.getBounds() ?? this.map!.getBounds())
  }

  ngOnDestroy() {
    console.log('Destroying');
    this.poligonGroup.clearLayers();
    this.map?.remove();
  }
}
