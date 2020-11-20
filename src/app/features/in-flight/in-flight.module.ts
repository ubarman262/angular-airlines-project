import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InFlightRoutingModule } from './in-flight-routing.module';
import { AddAncillaryComponent } from './components/add-ancillary/add-ancillary.component';
import { ChangeMealPrefComponent } from './components/change-meal-pref/change-meal-pref.component';
import { ShopRequestComponent } from './components/shop-request/shop-request.component';
import { PassengerSpecialmealComponent } from './components/passenger-specialmeal/passenger-specialmeal.component';
import { PassengerListComponent } from './components/passenger-list/passenger-list.component';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { MaterialModule } from 'src/app/common-modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddAncillaryComponent,
    ChangeMealPrefComponent, ShopRequestComponent, PassengerSpecialmealComponent,
    PassengerListComponent, FlightListComponent],
  imports: [
    CommonModule,
    InFlightRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class InFlightModule { }
