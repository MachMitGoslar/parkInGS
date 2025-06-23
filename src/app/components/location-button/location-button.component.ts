import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { locate } from 'ionicons/icons';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { LocationService } from 'src/app/services/location.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-button',
  templateUrl: './location-button.component.html',
  styleUrls: ['./location-button.component.scss'],
  imports: [IonButton, IonIcon, CommonModule],
})
export class LocationButtonComponent implements OnInit {
  public active: Observable<Boolean> = new Observable<Boolean>()

  constructor(public locationSrv: LocationService) {
    this.active = this.locationSrv.$active;
    addIcons({
      locate,
    });
  }

  ngOnInit() {}

  activate() {
    this.locationSrv.getPermissions(navigator)
  }
}
