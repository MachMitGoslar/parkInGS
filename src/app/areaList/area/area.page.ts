import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, ModalController, IonButtons, IonButton, IonList, IonItem, IonNote, IonLabel} from '@ionic/angular/standalone';
import { ParkingArea } from 'src/app/helper/parkingArea';
import { ParkingAreaService } from 'src/app/services/parking-area.service';
import { DocumentReference, GeoPoint } from '@angular/fire/firestore';
import { find, map, Subject, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { FixedMapComponent } from 'src/app/helper/fixed-map/fixed-map.component';
import { ParkingControlsComponent } from 'src/app/components/parking-controls/parking-controls.component';
import { ActivatedRoute } from '@angular/router';
import { LocationButtonComponent } from 'src/app/components/location-button/location-button.component';

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
    IonNote, 
    IonLabel, 
    FixedMapComponent,
    ParkingControlsComponent,
    LocationButtonComponent
  ]
})

export class AreaPage implements OnInit, OnDestroy {

  //@Input() area: ParkingArea = new ParkingArea()
  @Input() ref?: DocumentReference
  public pageType_internal = true;
  public area: Subject<ParkingArea>
  public points: GeoPoint[] = []
  private subscriptions: Subscription[] = [];

  constructor(
    public parkingAreaSrv: ParkingAreaService, 
    private modalCtrl: ModalController,
    public route: ActivatedRoute
  ) { 
    
    this.area = new Subject()

  }

  ngOnInit() {
    if(this.route.snapshot.params['uuid']) {
      this.ref = this.parkingAreaSrv.getRefFromString(this.route.snapshot.params['uuid'])
      this.pageType_internal = false;
    }
    console.log("Ref: ", this.ref)
    this.area = this.parkingAreaSrv.getAreaByRef(this.ref!)
    this.area.subscribe(value => console.log("area is: ", value))
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




}
