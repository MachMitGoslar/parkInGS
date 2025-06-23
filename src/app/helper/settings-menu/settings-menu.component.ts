import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonContent,

} from "@ionic/angular/standalone"
import { LoginButtonComponent } from "./login-button/login-button.component";

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
  imports: [
    IonButtons,
    IonHeader,
    IonToolbar,
    IonMenuButton,
    IonContent,
    LoginButtonComponent
]
})
export class SettingsMenuComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
