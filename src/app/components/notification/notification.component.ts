import { Component, OnInit } from '@angular/core';
import { IonToast } from '@ionic/angular/standalone';

import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LogControllerService, LogEntry} from 'src/app/services/log-controller.service';

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
        
        //this.logCtrl.removeLog()
      },
    }]

  constructor( public logCtrl: LogControllerService) { 

        this.logs = this.logCtrl.logs;
                      
  }

  ngOnInit() {
  }

  removeLog(event: any) {
    
    this.logCtrl.removeLog(event)
  }

}
