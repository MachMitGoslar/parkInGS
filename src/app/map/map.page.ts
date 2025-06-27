import { Component, signal, SimpleChanges } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { MapComponent } from '../components/map/map.component';
import {IonFab, IonIcon, IonFabButton, ModalController } from '@ionic/angular/standalone'
import { addIcons } from 'ionicons';
import { add, pencil, close } from 'ionicons/icons';

import { polygon } from 'leaflet';
import { ParkingArea } from '../services/parkingArea';
import { GeoPoint } from '@angular/fire/firestore';
import { LogControllerService, LogLevel } from '../services/log-controller.service';
import { ParkingAreaService } from '../services/parking-area.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaPage } from '../areaList/area/area.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, MapComponent, IonFab, IonIcon, IonFabButton],
})
export class MapPage {

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
    
    this.drawing = false;
    this.points = [];
  }


  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AreaPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      
    }
  }

}
