import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public router: Router, private snackBar: MatSnackBar) {}

  user: SocialUser;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (localStorage.getItem('socialUser') !== 'null') {
        return true;
      }
      else {
        this.openSnackBar('No permission to view this page', 'close');
        this.router.navigate(['/login']);
        return false;
      }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 10000,
      verticalPosition: 'bottom',
    });
  }


}
