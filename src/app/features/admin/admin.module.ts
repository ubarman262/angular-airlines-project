import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PassengerListComponent } from './components/passenger-list/passenger-list.component';
import { PassengerUpdateComponent } from './components/passenger-update/passenger-update.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/common-modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AncillaryManageComponent } from './components/ancillary-manage/ancillary-manage.component';
import { PassengerAddComponent } from './components/passenger-add/passenger-add.component';
import { InflightShopManageComponent } from './components/inflight-shop-manage/inflight-shop-manage.component';
import { SpecialmealManageComponent } from './components/specialmeal-manage/specialmeal-manage.component';


@NgModule({
  declarations: [ PassengerListComponent, PassengerUpdateComponent,
    DashboardComponent, AncillaryManageComponent,
    PassengerAddComponent, InflightShopManageComponent, SpecialmealManageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
