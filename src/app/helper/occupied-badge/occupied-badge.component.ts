import { Component, OnInit, Input} from '@angular/core';
import { IonBadge } from "@ionic/angular/standalone"

@Component({
  selector: 'app-occupied-badge',
  templateUrl: './occupied-badge.component.html',
  styleUrls: ['./occupied-badge.component.scss'],
  imports: [
    IonBadge
  ]
})
export class OccupiedBadgeComponent  implements OnInit {

  @Input() slot: string = 'start';
  @Input() occupied: number = 0;
  @Input() capacity: number = 0;

  public style: any;

  constructor() { }

  ngOnInit() {
    try {
      let amount = this.occupied / this.capacity
      let red = 255 * amount;
      let green = 255 * (1-amount);

      this.style = "background: rgb("+red+","+green+",0)";
    } catch {
      this.style = "background: rgb(20,20,20)"
    }

  }

}
