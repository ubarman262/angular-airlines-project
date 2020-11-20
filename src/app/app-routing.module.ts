import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from './core/guards/admin-auth.guard';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { FlightDetailsComponent } from './features/check-in/components/flight-details/flight-details.component';
import { LoginComponent } from './features/login/components/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'login',
  loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)},
  { path: 'check-in',
  loadChildren: () => import('./features/check-in/check-in.module').then(m => m.CheckInModule), canActivate: [AuthGuardService]},
  { path: 'dashboard',
  loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule), canActivate: [AdminAuthGuard]},
  { path: 'in-flight',
  loadChildren: () => import('./features/in-flight/in-flight.module').then(m => m.InFlightModule), canActivate: [AuthGuardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
