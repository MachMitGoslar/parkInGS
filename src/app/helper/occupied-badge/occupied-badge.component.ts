import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-occupied-badge',
  templateUrl: './occupied-badge.component.html',
  styleUrls: ['./occupied-badge.component.scss'],

})
export class OccupiedBadgeComponent  implements OnInit {

  @Input() slot: string = 'start';
  @Input() occupied: number = 0;
  @Input() capacity: number = 0;

  public amount: number = 0;
  public style: any;

  constructor() { }

  ngOnInit() {
    try {
      this.amount = (this.occupied / this.capacity)*100
      console.log(this.amount)
      let amount = this.occupied / this.capacity
      let red = 255 * amount;
      let green = 255 * (1-amount);

      this.style = "background: rgb("+red+","+green+",0)";
    } catch {
      this.style = "background: rgb(20,20,20)"
    }

  }

}
