import { Component, signal, SimpleChanges } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { MapComponent } from '../map/map.component';
import {IonFab, IonIcon, IonFabButton, ModalController } from '@ionic/angular/standalone'
import { addIcons } from 'ionicons';
import { add, pencil, close } from 'ionicons/icons';

import { polygon } from 'leaflet';
import { ParkingArea } from '../helper/parkingArea';
import { AreaModalComponent } from '../modals/area-modal/area-modal.component';
import { GeoPoint } from '@angular/fire/firestore';
import { LogControllerService, LogLevel } from '../helper/log-controller.service';
import { ParkingAreaService } from '../services/parking-area.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, MapComponent, IonFab, IonIcon, IonFabButton],
})
export class Tab1Page {

  public area = new ParkingArea();
  public points: GeoPoint[] = [];
  public drawing = false;

  constructor(
    public modalCtrl: ModalController, 
    private areaSrv: ParkingAreaService,
    public route: ActivatedRoute,
        private logCtrl: LogControllerService, 

  ) {
        addIcons({ add, pencil, close })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected parent:', changes);
  }

  startDrawing():void {

    this.drawing = true;
  }

  finishDrawing():void {
    this.area.borderPoints = this.points;
    this.drawing = false;

    this.areaSrv.saveAreaToDB(this.area).catch(error => {
      this.logCtrl.addLog(error, LogLevel.Danger)
    })

    //this.openModal();
  }

  scrapDrawing(): void {
    console.log("Scrapping Drawing")
    this.drawing = false;
    this.points = [];
  }


  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AreaModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(`Hello, ${data}!`);
    }
  }

}
