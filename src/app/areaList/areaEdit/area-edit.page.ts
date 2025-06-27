import { Component, OnInit, Input} from '@angular/core';

import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  ModalController,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonInput,
} from '@ionic/angular/standalone';

import { ParkingArea } from 'src/app/services/parkingArea';
import { ParkingAreaService } from 'src/app/services/parking-area.service';
import { MapComponent } from 'src/app/components/map/map.component';
import { GeoPoint } from '@angular/fire/firestore';
import { LogControllerService, LogLevel } from 'src/app/services/log-controller.service';


@Component({
  selector: 'app-area-edit',
  templateUrl: './area-edit.page.html',
  styleUrls: ['./area-edit.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    MapComponent,
    ReactiveFormsModule,
    FormsModule,
    IonInput
]
})

export class AreaEditPage implements OnInit {

  @Input() area: ParkingArea = new ParkingArea();
  private initialPoints: GeoPoint[] = [];

  public form: FormGroup


  constructor(
    private parkingAreaSrv: ParkingAreaService, 
    private modalCtrl: ModalController,
    private notifcationSrv: LogControllerService,
    private fb: FormBuilder,
  ) { 
    this.form = new FormGroup([])
    

  }

  ngOnInit() {
    this.initialPoints = this.area.borderPoints;
    this.form = this.fb.group({
      "name": new FormControl(this.area.name, [Validators.required]),
      "address": new FormControl(this.area.readable_street, [Validators.required]),
      "plz": new FormControl(this.area.readable_plz, [Validators.required, /*Validators.pattern("\b\d{5}\b")*/]),
      "city": new FormControl(this.area.readable_city, Validators.required),
      "capacity": new FormControl(this.area.capacity, [Validators.required, Validators.min(1)])
    })
    this.form.valueChanges.subscribe(values => {
      this.area.name = values.name;
      this.area.readable_street = values.address;
      this.area.readable_plz = values.plz;
      this.area.readable_city = values.city;
      this.area.capacity = values.capacity
    })
  }



  cancel() {
    //restore original Points
    this.area.borderPoints = this.initialPoints;
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    
    this.parkingAreaSrv.saveAreaToDB(this.area).then(() => {
      this.notifcationSrv.addLog("Parkplatz erfolgreich erstellt", LogLevel.Success, 200)
      return this.modalCtrl.dismiss()
    }, error => {
      this.notifcationSrv.addLog(error, LogLevel.Danger, 404)
    })
  }


}
