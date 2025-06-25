import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonInput,
  IonGrid,
} from "@ionic/angular/standalone";
import { LogControllerService, LogLevel, StatusCode } from 'src/app/helper/log-controller.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    IonContent,
    ReactiveFormsModule,
    IonButton,
    IonInput,
    IonGrid,
  ]
})
export class LoginComponent  implements OnInit {

  public fb = new FormBuilder()
  public login_form: FormGroup
  private email: string = ""
  private password: string = ""

  constructor(
    public userSrv: UserService,
    public logSrv: LogControllerService,
    public router: Router
  ) {

    this.login_form = new FormGroup({
      'email': new FormControl(this.email, Validators.required),
      'password': new FormControl(this.password, Validators.required)
    })

    this.login_form.valueChanges.subscribe(values => {
      this.email = values.email;
      this.password = values.password;
    })
   }

  ngOnInit() {}


  submit() {
    
    this.userSrv.login(this.email, this.password).then((user) => {
      this.logSrv.addLog("Willkommen "+ user?.displayName, LogLevel.Success, 200)
      this.router.navigate(["/edit/tab2"])
    }, error => {
      this.logSrv.addLog(error, LogLevel.Danger, StatusCode.NotFound)
    })
  }
}
