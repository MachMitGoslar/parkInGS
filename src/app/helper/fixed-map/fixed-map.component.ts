import {
  booleanAttribute,
  Component,
  input,
  OnInit,
  Input,
  OnDestroy,
} from '@angular/core';
import * as L from 'leaflet';
import { GeoPoint } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ParkingArea } from '../parkingArea';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-fixed-map',
  templateUrl: './fixed-map.component.html',
  styleUrls: ['./fixed-map.component.scss'],
})
export class FixedMapComponent implements OnInit, OnDestroy {
  @Input() height = '100%';
  @Input() areas: ParkingArea[] = [];

  public map: L.Map | undefined;

  private polygon_layer: L.LayerGroup | undefined;
  public route_id = '';
  public my_marker?: L.Marker

  constructor(private route: ActivatedRoute, private locationSrv: LocationService) {
    this.route_id = route.snapshot.routeConfig?.path ?? '';
  }

  ngOnInit() {}

  async ngAfterViewInit() {
    this.map = await this.initMap();
    setTimeout(() => {
      this.map?.invalidateSize();
      this.drawPoligon();
    }, 1000);
  }

  private async initMap(): Promise<L.Map> {
    let map = L.map('map_' + this.route_id, {
      dragging: false,
      attributionControl: false,
      zoomControl: true,
      scrollWheelZoom: true,
    }).setView([51.9193, 10.4301], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    return map.whenReady((event) => {
      console.log("Map should be ready")
      this.locationSrv.$position.subscribe({
        next: location => {
          var myIcon = L.icon({
            iconUrl: 'assets/imgs/002-location-pin.svg',
            iconSize: [38, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
          })
          if(this.my_marker) this.my_marker.remove();
          console.log("drawing marker")
          this.my_marker = new L.Marker([location.latitude, location.longitude], {icon: myIcon}).addTo(event.target)
        }
      })
      return event.target;
    });
  }

  private drawPoligon() {
    this.map?.whenReady(() => {
      console.log('Map ready, now drawing');

      if (this.polygon_layer) this.polygon_layer.clearLayers();

      this.polygon_layer = L.layerGroup();

      let bounding_box: L.LatLngBounds = new L.LatLngBounds(
        [51.9193, 10.4301],
        [51.9193, 10.4301]
      );
      for (let area of this.areas) {
        if (area.borderPoints && area.borderPoints.length > 0) {
          L.polygon(
            area.borderPoints.map((x) => {
              let point: L.LatLngExpression = [x.latitude, x.longitude];
              bounding_box.extend(point);
              return point;
            })
          ).addTo(this.polygon_layer);
        }
        this.polygon_layer.addTo(this.map!);
      }
      if (this.map && this.polygon_layer) {
        this.map.fitBounds(bounding_box);
      }
    });
  }
  ngOnDestroy() {
    console.log('Destroying');
    this.map?.remove();
  }
}
