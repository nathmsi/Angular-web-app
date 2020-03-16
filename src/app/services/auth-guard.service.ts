import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router , private authService : AuthService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if(user) {
              this.authService.setCurrentUser();
              resolve(true);
            } else {
              this.router.navigate(['/auth', 'signin']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}