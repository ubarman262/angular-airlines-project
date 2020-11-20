import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  loggedIn = false;
  adminLogin = false;
  user: SocialUser;
  constructor(private authService: SocialAuthService, private router: Router) { }
  ngDoCheck(): void {
    if (localStorage.getItem('adminlogin') !== 'true'){
      this.adminLogin = false;
    } else {
      this.adminLogin = true;
    }
    if (localStorage.getItem('socialUser') === 'null') {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
  }
  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('socialUser'));
  }
}
