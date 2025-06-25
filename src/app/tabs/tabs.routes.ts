import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { firestoreGuard, firestoreNestedGuard } from '../guards/firestore.guard';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'mapPage',
        loadComponent: () =>
          import('../map/map.page').then((m) => m.MapPage),
        canActivate: [firestoreGuard]

      },
      {
        path: 'areaList',
        loadComponent: () =>
          import('../areaList/areaList.page').then((m) => m.AreaListPage),
        canActivate: [firestoreGuard]

      },
    ],
  },
  {
    path: '',
    redirectTo: '/edit/areaList',
    pathMatch: 'full',

  },
];
