import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { User } from '../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  username: string;
  public isMenuCollapsed = true;

  constructor(private authService: AuthService , private router: Router) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.username = user.displayName;
          this.authService.isAuth(new User(
            user.displayName,
            user.email,
            user.uid,
            true
          ))
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
    this.router.navigate(['/auth','signin']);
  }


}
