import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { APP_BASE_HREF } from '@angular/common';
import { connectAuthEmulator } from '@firebase/auth';

bootstrapApplication(AppComponent, {
  providers: [
        { provide: APP_BASE_HREF, useValue: environment.base_href},

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), 
    provideFirebaseApp(() =>  initializeApp(environment.firebaseConfig)),
    provideAuth(() => {
      let auth = getAuth();
        if(!environment.production) {
          connectAuthEmulator(auth, "http://127.0.0.1:9099")
        }
      return auth;
    }
    ), 
    provideFirestore(() => {
      let firestore = getFirestore();
      if(!environment.production) {
       connectFirestoreEmulator(firestore, "localhost", 8111);
      }
      return firestore
    }),
  ],
  
});


