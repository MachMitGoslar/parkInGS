import { inject, Injectable } from '@angular/core';
import { Auth, signInAnonymously, signInWithEmailAndPassword, User} from '@angular/fire/auth';
import { Observable, ReplaySubject, Subject } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private auth = inject(Auth);
  //public $user: Observable<User>
  public user: ReplaySubject<User | null> = new ReplaySubject(1)
  public authenticated: boolean = false;
  

  constructor() {

    this.auth.onAuthStateChanged( currentUser => {
    //
      this.user.next(currentUser)
      if(currentUser) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
    })
    this.auth.authStateReady().then(() => {
      
      this.user.next(this.auth.currentUser)
      if(this.auth.currentUser) {
        this.authenticated = true
      } else {
        this.authenticated = false;
      }
    })
   }

   login(email: string, password: string): Promise<User | undefined> {
    return signInWithEmailAndPassword(this.auth, email, password).then( user => {
      
      return user.user;
    }, error => {
      return error
    })
   }
      loginAnon(): Promise<User | undefined> {
    return signInAnonymously(this.auth).then( user => {
      
      return user.user;
    }, error => {
      return error
    })
   }


   logout(): Promise<void>{
    return this.auth.signOut()
   }

}
