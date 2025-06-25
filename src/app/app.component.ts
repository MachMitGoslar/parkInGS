import { Component, EnvironmentInjector, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { NotificationComponent } from './components/notification/notification.component';
import { LogControllerService } from './services/log-controller.service';


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
