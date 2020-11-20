import { Component, OnInit } from '@angular/core';
import { Passenger } from 'src/app/common-modules/shared/interfaces/passenger';
import { SpecialMeal } from 'src/app/common-modules/shared/interfaces/special-meal';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { MiddleManService } from 'src/app/core/services/middle-man.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-meal-pref',
  templateUrl: './change-meal-pref.component.html',
  styleUrls: ['./change-meal-pref.component.scss']
})
export class ChangeMealPrefComponent implements OnInit {
  selectedOption: string;
  options: string[] = ['None'];
  selectedPassenger: Passenger;
  flightId: number;
  constructor(private middleMan: MiddleManService, private service: HttpApiService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.selectedPassenger = this.middleMan.getPassenger();
    this.flightId = this.selectedPassenger?.fid;
    this.service.getSpecialMealByFid(this.flightId).subscribe((response: SpecialMeal) => {
      this.options = this.options.concat(response[0].specialmeals);
    });
  }
  changeMeal(): void {
    this.selectedPassenger.specialMeal = this.selectedOption;
    this.service.updatePassengerDetails(this.selectedPassenger).subscribe((response: Passenger) => {
      this.openSnackBar('Meal Updated', 'close');
    });
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 10000,
      verticalPosition: 'bottom',
    });
  }
}
