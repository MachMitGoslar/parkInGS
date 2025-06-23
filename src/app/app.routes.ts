import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';


export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () => import('./user/login/login.component').then( m => m.LoginComponent)
  },
  {
    path: 'areas',
    loadComponent: () => import('./areaList/areaList.page').then( m => m.AreaListPage)
  },
  {
    path: 'area/:uuid',
    loadComponent: () => import('./areaList/area/area.page').then( m => m.AreaPage)
  }
];
