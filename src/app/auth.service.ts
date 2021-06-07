import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable()
export class AuthService {
  authState: any;
  loggedin: boolean;


  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
    ) 
    {
      this.afAuth.authState.subscribe( authState => {
      this.authState = authState;
    });  
  }


  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Nice, it worked!');
      this.router.navigateByUrl('/admin-panel');
      console.log(this.islogged())
    })
    .catch(err => {
      console.log('Something went wrong: ', err.message);
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
    this.router.navigate(['/homepage']);
    });
}

islogged() {this.afAuth.onAuthStateChanged(user => {
console.log(user)
  if (user!=null) {
    this.authState=true
    console.log(this.authState)
    return true
  }
  else {
    this.authState=false;
    console.log(this.authState)
    return false
  }
})}

}
