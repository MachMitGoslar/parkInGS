import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';
import {
  IonButtons,
  IonButton,
  IonIcon
} from "@ionic/angular/standalone"
import { UserService } from 'src/app/services/user.service';
import { addIcons } from 'ionicons';
import { add, remove} from "ionicons/icons"
import { ParkingAreaService } from 'src/app/services/parking-area.service';
import { ParkingArea } from 'src/app/helper/parkingArea';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parking-controls',
  templateUrl: './parking-controls.component.html',
  styleUrls: ['./parking-controls.component.scss'],
  imports: [
    IonButton, IonIcon, CommonModule,
  ]
})
export class ParkingControlsComponent  implements OnInit {

  public current_user: Observable<User | null>
  public subscriptions: Subscription[] = []
  @Input() area: ParkingArea = new ParkingArea()
  @Input() override_user: boolean = false
  
  constructor(
    public usrSrv: UserService,
    public parkingAreaSrv: ParkingAreaService
  ) { 
    addIcons({ add, remove});

    this.current_user = usrSrv.user;
  }

  ngOnInit() {
      console.log(this.current_user   )

  }
  ngOnDestroy() {
    for(let subscription of this.subscriptions) {
      subscription.unsubscribe()
    }
  }

  decrease() {
    console.log("Decreasing")
    this.parkingAreaSrv.decreaseCars(this.area.ref!, 1);
  }

  increase() {
    this.parkingAreaSrv.increaseCars(this.area.ref!,1)
  }

  setAmount(factor: number) {
    this.parkingAreaSrv.setAmount(this.area, factor)
  }

}
