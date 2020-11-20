import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { Admin } from 'src/app/common-modules/shared/interfaces/admin';
import { HttpApiService } from 'src/app/core/services/http-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  admin: Admin = {userName: '', password: ''};
  user: SocialUser;
  adminStatus = false;
  loggedIn: boolean;
  loginStatus: boolean;
  constructor(private authService: SocialAuthService, private router: Router, private service: HttpApiService) { }
  ngOnInit(): void {
    if (localStorage.getItem('adminlogin') === 'true') {
      this.adminStatus = true;
    }
    this.authService.authState.subscribe((user) => {
    this.user = user;
    localStorage.setItem('socialUser', JSON.stringify(this.user));
    });
    }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x =>  this.router.navigate(['/check-in']));
  }
  signOut(): void {
    this.authService.signOut();
  }
  adminLogin(userName: string, password: string): void {
    this.admin.userName = userName;
    this.admin.password = password;
    this.service.authAdmin(this.admin).subscribe(
      (response: any) => {
        if (response[0].userName === userName && response[0].password === password) {
          this.admin = response[0];
          localStorage.setItem('adminlogin', 'true');
          this.adminStatus = true;
          this.router.navigate(['/dashboard']);
        }
      },
      (errorResponse: any) => { console.log(errorResponse); },
      );
    }
    signOutAdmin(): void {
      this.adminStatus = false;
      localStorage.removeItem('adminlogin');
    }
}
