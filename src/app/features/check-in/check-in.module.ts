import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { MaterialModule } from 'src/app/common-modules/material/material.module';
import { CheckInRoutingModule } from './check-in-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PassengerListComponent } from './components/passenger-list/passenger-list.component';
import { FormsModule } from '@angular/forms';
import { ChangeSeatComponent } from './components/change-seat/change-seat.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';



@NgModule({
  declarations: [FlightListComponent, PassengerListComponent, ChangeSeatComponent, FlightDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CheckInRoutingModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class CheckInModule { }
