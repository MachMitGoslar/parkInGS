import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, ModalController, IonButtons, IonButton, IonList, IonItem, IonNote, IonLabel} from '@ionic/angular/standalone';
import { ParkingArea } from 'src/app/services/parkingArea';
import { ParkingAreaService } from 'src/app/services/parking-area.service';
import { DocumentReference, GeoPoint } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { FixedMapComponent } from 'src/app/components/fixed-map/fixed-map.component';
import { ParkingControlsComponent } from 'src/app/components/parking-controls/parking-controls.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationButtonComponent } from 'src/app/components/location-button/location-button.component';
import { addIcons } from 'ionicons';
import { navigate, qrCodeOutline, settingsOutline } from 'ionicons/icons';
import { UserService } from 'src/app/services/user.service';
import { QrcodeComponent } from 'src/app/components/qrcode/qrcode.component';
import { AreaEditPage } from '../areaEdit/area-edit.page';
import { User } from '@angular/fire/auth';


@Component({
  selector: 'app-area',
  templateUrl: './area.page.html',
  styleUrls: ['./area.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    IonButtons, 
    IonButton, 
    IonList, 
    IonItem, 
    IonIcon,
    IonNote, 
    IonLabel, 
    FixedMapComponent,
    ParkingControlsComponent,
    LocationButtonComponent,
  ]
})

export class AreaPage implements OnInit, OnDestroy {

  //@Input() area: ParkingArea = new ParkingArea()
  @Input() ref?: DocumentReference
  public pageType_internal = true;
  public area: Subject<ParkingArea>
  public points: GeoPoint[] = []
  private subscriptions: Subscription[] = [];
  private localArea?: ParkingArea
      public user: User | null = null;



  constructor(
    public parkingAreaSrv: ParkingAreaService, 
    private modalCtrl: ModalController,
    public route: ActivatedRoute,
    public router: Router,
    public userSrv: UserService
  ) { 
    
    addIcons({navigate,qrCodeOutline,settingsOutline});
    this.area = new Subject()

  }

  ngOnInit() {
    // Handle Permissions after directly login in
    if(this.route.snapshot.params['uuid']) {
      this.ref = this.parkingAreaSrv.getRefFromString(this.route.snapshot.params['uuid'])
      this.pageType_internal = false;
      this.userSrv.loginAnon();
    }
    this.area = this.parkingAreaSrv.getAreaByRef(this.ref!)
    this.subscriptions.push(this.area.subscribe(value => {
      this.localArea = value
      console.log("Internalt", this.pageType_internal);
      console.log("User: ", this.userSrv.user)
    }))
    this.subscriptions.push(this.userSrv.user.subscribe({
      next: user => {
        this.user = user;
      },
      error: error => {
        this.user = null
      }
    }))
  }

  ngOnDestroy() {
    for(let subscription of this.subscriptions) {
      subscription.unsubscribe()
    }
  }


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
        return this.modalCtrl.dismiss(null, 'cancel');

    //return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  async openQR(area: ParkingArea) {
        let modal = await this.modalCtrl.create({
          component: QrcodeComponent,
          componentProps: {
            area: area,
          },
        });
        modal.present();
  }

    async edit(area: ParkingArea) {
        let modal = await this.modalCtrl.create({
          component: AreaEditPage,
          componentProps: {
            area: area,
          },
        });
        
        modal.present();
  }

 



}
