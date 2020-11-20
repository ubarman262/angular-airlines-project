import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(public router: Router, private snackBar: MatSnackBar) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (localStorage.getItem('adminlogin') === 'true') {
        return true;
      }
      else {
        this.openSnackBar('No permission to view this page', 'close');
        localStorage.setItem('loggedin', 'false');
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
