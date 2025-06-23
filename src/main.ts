import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { getAuth, provideAuth } from '@angular/fire/auth';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), 
    provideFirebaseApp(() => initializeApp({ projectId: "parkings-6a502", appId: "1:242695705460:web:e40536cc8016d831619221", storageBucket: "parkings-6a502.firebasestorage.app", apiKey: "AIzaSyAz4qlRtC09idkXKGhrxxW7fkB5rqkml-A", authDomain: "parkings-6a502.firebaseapp.com", messagingSenderId: "242695705460" })), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()),
  ],
});
