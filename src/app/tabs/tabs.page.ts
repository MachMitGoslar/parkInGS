import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonMenu } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import * as L from 'leaflet';
import { SettingsMenuComponent } from "../helper/settings-menu/settings-menu.component";
import { AreaPage } from '../areaList/area/area.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    SettingsMenuComponent,
    IonMenu,    
  ],
})
export class TabsPage {
  constructor() {
    addIcons({ triangle, ellipse, square });
  }

  ionTabsWillChange() {
    console.log('Leaving view');
    try {
      L.map('map').remove();
    } catch {
      console.log('no map');
    }
  }
  ionTabsDidChange() {
    console.log('Left view');
    try {
      L.map('map').remove();
    } catch {
      console.log('no map');
    }
  }
}
