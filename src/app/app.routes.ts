import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { firestoreGuard } from './guards/firestore.guard';


export const routes: Routes = [
  {
    path: 'edit',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [firestoreGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./user/login/login.component').then( m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () => import('./areaList/areaList.page').then( m => m.AreaListPage)
  },
  {
    path: 'area/:uuid',
    loadComponent: () => import('./areaList/area/area.page').then( m => m.AreaPage)
  }
];
