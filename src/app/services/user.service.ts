import { inject, Injectable } from '@angular/core';
import { Auth, AuthModule, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private auth = inject(Auth)
  //public $user: Observable<User>
  public user: ReplaySubject<User | null> = new ReplaySubject(1)

  constructor() {
    this.auth.onAuthStateChanged( currentUser => {
      console.log("New Current User", currentUser)
      this.user.next(currentUser)
    })
    this.auth.authStateReady().then(() => {
      console.log("Auth State ready")
      this.user.next(this.auth.currentUser)
    })
   }

   login(email: string, password: string): Promise<User | undefined> {
    return signInWithEmailAndPassword(this.auth, email, password).then( user => {
      
      return user.user;
    }, error => {
      return error
    })
   }

   logout(): Promise<void>{
    return this.auth.signOut()
   }
}
