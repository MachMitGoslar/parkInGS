import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  ModalController,
  IonIcon,
  IonButton,

} from "@ionic/angular/standalone"
import { AreaPage } from 'src/app/areaList/area/area.page';
import { OccupiedBadgeComponent } from 'src/app/helper/occupied-badge/occupied-badge.component';
import { ParkingArea } from 'src/app/helper/parkingArea';
import { addIcons } from 'ionicons';
import { location, navigate } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { DistancePipe } from 'src/app/pipes/distance.pipe';

@Component({
  selector: 'app-area-card',
  templateUrl: './area-card.component.html',
  styleUrls: ['./area-card.component.scss'],
  imports: [
      IonCard,
      IonCardContent,
      IonCardHeader,
      IonCardSubtitle,
      IonCardTitle,
      OccupiedBadgeComponent,
      IonIcon,
      IonButton,
      CommonModule,
      DistancePipe
  ]
})
export class AreaCardComponent  implements OnInit, OnChanges {

  @Input() area: ParkingArea = new ParkingArea();

  constructor(
    public modalCtrl: ModalController
  ) {
    addIcons({
      location,
      navigate
    })


   }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
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



    get area_image() {
      let rand =  Math.floor(Math.random()*10000)

     return 'https://picsum.photos/seed/'+this.area.ref?.id+'/1200/400'
    }
}
