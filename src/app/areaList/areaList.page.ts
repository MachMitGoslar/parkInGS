import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonIcon,
  IonTitle,
  IonContent,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonList,
  IonLabel,
  IonItem,
  ModalController,
  IonFab,
  IonFabButton,
  IonMenuButton,
  IonButtons,
  IonGrid,
  IonCol, IonButton } from '@ionic/angular/standalone';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { ParkingArea } from '../services/parkingArea';
import { ParkingAreaService } from '../services/parking-area.service';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { location, add, logOutOutline } from 'ionicons/icons';
import {AreaPage } from './area/area.page'
import {  LogLevel, LogControllerService } from '../services/log-controller.service';
import { AreaEditPage } from './areaEdit/area-edit.page';
import { OccupiedBadgeComponent } from '../components/occupied-badge/occupied-badge.component';
import { UserService } from '../services/user.service';
import { AreaCardComponent } from "../components/area-card/area-card.component";
import { LocationButtonComponent } from '../components/location-button/location-button.component';
import { LocationService } from '../services/location.service';
import { User } from '@angular/fire/auth';
@Component({
  selector: 'app-area-list',
  templateUrl: 'areaList.page.html',
  styleUrls: ['areaList.page.scss'],
  imports: [IonButton, 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonItem,
    IonLabel,
    IonIcon,
    CommonModule,
    IonFabButton,
    IonFab,
    OccupiedBadgeComponent,
    IonMenuButton,
    IonButtons,
    AreaCardComponent,
    LocationButtonComponent,
    IonGrid,
    IonCol
],
  providers: [
    AreaEditPage
  ]
})
export class AreaListPage {
  public areas = new Observable<ParkingArea[]>;
  // public $user: ReplaySubject<User | null> = new ReplaySubject(1);
  public user: User | null = null
  private _subscriptions: Subscription[] = [];

  constructor(
    public parkingService: ParkingAreaService,
    public locationService: LocationService,
    public modalCtrl: ModalController,
    public logSrv: LogControllerService,
    public userSrv: UserService
  
  ) {
          this.areas = parkingService.areas

    locationService.$active.subscribe({
      next: (active) => {
      if(active && locationService.position) {
        this.areas = parkingService.sortByLocation(locationService.position)
      } else {
        this.areas = parkingService.areas 
      }
      },
      error: (error) => {

      }
    }

    )
    this._subscriptions.push(this.userSrv.user.subscribe({
      next: user => {
        this.user = user;
      },
      error: error => {
        this.user = null
      }
    }))

    addIcons({ location, add, logOutOutline});
  }


  async openArea(area: ParkingArea) {
    let modal = await this.modalCtrl.create({
      component: AreaPage,
      componentProps: {
        ref: area.ref,
      },
    });
    modal.present();
  }

  
  deleteArea(area: ParkingArea) {
    this.parkingService.delete(area.ref).then(
      () => {
        this.logSrv.addLog('Erfolgreich gelöscht', LogLevel.Success, 200);
      },
      (error) => {
        this.logSrv.addLog(error, LogLevel.Warning, 500);
      }
    );
  }

    async editArea(area = new ParkingArea()) {
    let modal = await this.modalCtrl.create({
      component: AreaEditPage,
      componentProps: {
        area: area,
      },
    });
    modal.present();
  }

  logout() {
    this.userSrv.logout()
  }
}
