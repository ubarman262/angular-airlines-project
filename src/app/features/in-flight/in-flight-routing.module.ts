import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { PassengerSpecialmealComponent } from './components/passenger-specialmeal/passenger-specialmeal.component';

const routes: Routes = [{
  path: '',
  component: FlightListComponent,
  children: [
    {path: 'mealschart', component: PassengerSpecialmealComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InFlightRoutingModule { }
