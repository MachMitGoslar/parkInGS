import { Component, OnInit } from '@angular/core';
import { IonToast } from '@ionic/angular/standalone';
import {LogControllerService, LogEntry } from '../log-controller.service';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  imports:[ IonToast, CommonModule]
})
export class NotificationComponent  implements OnInit {
 
  public logs: Subject<LogEntry[]>
  public ToastButtons =[{
      text: 'Schließen',
      role: 'cancel',
      handler: () => {
        console.log('Dismiss clicked');
        //this.logCtrl.removeLog()
      },
    }]

  constructor( public logCtrl: LogControllerService) { 

        this.logs = this.logCtrl.logs;
                      console.log("Initializing", this.logs);
  }

  ngOnInit() {
  }

  removeLog(event: any) {
    console.log(event);
    this.logCtrl.removeLog(event)
  }

}
