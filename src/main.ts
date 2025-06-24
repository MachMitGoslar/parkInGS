import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { APP_BASE_HREF } from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [
        { provide: APP_BASE_HREF, useValue: environment.base_href},

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), 
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()),
  ],
  
});
