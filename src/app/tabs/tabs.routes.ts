import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { firestoreGuard, firestoreNestedGuard } from '../guards/firestore.guard';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
                canActivate: [firestoreGuard]

      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../areaList/areaList.page').then((m) => m.AreaListPage),
        canActivate: [firestoreGuard]

      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
        canActivate: [firestoreGuard]
      },
      {
        path: '',
        redirectTo: '/edit/tab1',
        pathMatch: 'full',
                    canActivateChild: [firestoreNestedGuard]

      },
    ],
  },
  {
    path: '',
    redirectTo: '/edit/tab2',
    pathMatch: 'full',

  },
];
