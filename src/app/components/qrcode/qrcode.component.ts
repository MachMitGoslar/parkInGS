import { Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ParkingArea } from 'src/app/helper/parkingArea';
import { QRCodeComponent } from 'angularx-qrcode';
import {
  IonButton,
  IonToolbar,
  IonContent,
  IonHeader,
  IonTitle,
  IonButtons,
  ModalController
} from "@ionic/angular/standalone"

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
  imports: [
    QRCodeComponent,
    IonButton,
    IonToolbar,
    IonHeader,
    IonContent,
    IonButtons,
    IonTitle
  ]
})
export class QrcodeComponent  implements OnInit {
  @Input() area: ParkingArea = new ParkingArea()

  public qrDownloadLink: SafeUrl = "";
  public qrData: SafeUrl ="";

  constructor(
    public modalCtrl: ModalController
  ) {
      console.log(location.href)
          this.qrData = location.href+"/area/"+this.area.ref?.id
   }

  ngOnInit() {}

     onChangeURL(url: SafeUrl) {
      this.qrDownloadLink = url;
    }

    cancel() {
      this.modalCtrl.dismiss()
    }

}
