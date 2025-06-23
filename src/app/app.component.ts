import { Component, EnvironmentInjector, inject } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { ReactiveFormsModule } from '@angular/forms';

import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { LogControllerService } from './helper/log-controller.service';
import { NotificationComponent } from './helper/notification/notification.component';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, ReactiveFormsModule, NotificationComponent],
  providers: [
    //provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
  ]
})
export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(
        private logCtrl: LogControllerService, 
    
  ) {}
}
