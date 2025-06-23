import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { person } from 'ionicons/icons';
import {
  IonItem,
  IonIcon,
  IonLabel

} from "@ionic/angular/standalone"
import { UserService } from 'src/app/services/user.service';
import { User } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss'],
  imports: [
    IonItem,
    IonIcon,
    IonLabel,
    CommonModule
  ]
})
export class LoginButtonComponent  implements OnInit {

  public user: Subject<User | null>

  constructor(
    private userSrv: UserService, 
    public router: Router,
    public route: ActivatedRoute
  ) { 

    addIcons({
      person
    })

    this.user = userSrv.user;
  }

  ngOnInit() {
        this.user = this.userSrv.user;

  }

  toLogin() {
    this.router.navigate(["/login"]);
  }

  logout() {
    this.userSrv.logout().then(() => {
      this.router.navigate(["/tabs"])
    })
  }
}
