import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AncillaryManageComponent } from './components/ancillary-manage/ancillary-manage.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InflightShopManageComponent } from './components/inflight-shop-manage/inflight-shop-manage.component';
import { PassengerListComponent } from './components/passenger-list/passenger-list.component';
import { PassengerUpdateComponent } from './components/passenger-update/passenger-update.component';
import { SpecialmealManageComponent } from './components/specialmeal-manage/specialmeal-manage.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {path: 'passengerlist', component: PassengerListComponent},
      {path: 'passengerupdate', component: PassengerUpdateComponent},
      {path: 'ancillary', component: AncillaryManageComponent},
      {path: 'inflightshop', component: InflightShopManageComponent},
      {path: 'specialmeal', component: SpecialmealManageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
