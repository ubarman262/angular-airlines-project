import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { PassengerListComponent } from './components/passenger-list/passenger-list.component';

const routes: Routes = [
  {
    path: '',
    component: FlightListComponent,
    children: [
      {path: 'passengers', component: PassengerListComponent},
      {path: 'flightdetails', component: FlightDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CheckInRoutingModule {}
