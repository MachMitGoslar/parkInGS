import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle, 
  IonIcon, 
  IonCardContent, 
  IonButton 
} from "@ionic/angular/standalone"

@Component({
  selector: 'app-intro-card',
  templateUrl: './intro-card.component.html',
  styleUrls: ['./intro-card.component.scss'],
  imports: [
    IonButton, 
    IonCardContent, 
    IonIcon, 
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    DatePipe
  ]
})
export class IntroCardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  get getDate() {
    return new Date()
  }

}
