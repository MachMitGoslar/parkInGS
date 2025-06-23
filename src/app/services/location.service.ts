import { Injectable } from '@angular/core';
import { GeoPoint } from '@angular/fire/firestore';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public position: GeoPoint = new GeoPoint(0,0)
  public $position: ReplaySubject<GeoPoint> = new ReplaySubject()
  public $active: ReplaySubject<boolean> = new ReplaySubject();
  constructor() { 

  }


  getPermissions(navigator: Navigator) {
    this.$active.next(false);
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        console.log(result)
      if (result.state === 'granted') {
        navigator.geolocation.watchPosition(position => {
          let point = new GeoPoint(position.coords.latitude, position.coords.longitude);
          this.$position.next(point)
          this.position = point;
          this.$active.next(true);
        }, error => {
          this.$position.error(error)
          this.$active.next(false)
        })
      } else if (result.state === 'prompt') {
        navigator.geolocation.watchPosition(position => {
          let point = new GeoPoint(position.coords.latitude, position.coords.longitude);
          this.$position.next(point)
          this.position = point;          
          this.$active.next(true)
        }, error => {
          this.$position.error(error)
          this.$active.next(false)
        })
      } else if (result.state === 'denied') {
            this.$position.error("Position Permissions denied")      
            this.$active.next(false)
      } else {
        this.$position.error("smth else")      
        this.$active.next(false)
      }
    }, error => {
      this.$position.error(error);
      this.$active.next(false);
    });
  }
  
}
