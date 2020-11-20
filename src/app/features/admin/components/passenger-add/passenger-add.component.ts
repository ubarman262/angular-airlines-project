import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Passenger } from 'src/app/common-modules/shared/interfaces/passenger';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { MiddleManService } from 'src/app/core/services/middle-man.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SpecialMeal } from 'src/app/common-modules/shared/interfaces/special-meal';

@Component({
  selector: 'app-passenger-add',
  templateUrl: './passenger-add.component.html',
  styleUrls: ['./passenger-add.component.scss']
})
export class PassengerAddComponent implements OnInit {
  selected: boolean;
  wheelchairRequired: boolean;
  withInfant: boolean;
  specialMealData: string[] = ['None'];
  selectedOption: string;
  isCheckedWheelchair: boolean;
  isCheckedWithInfant: boolean;
  constructor( private service: HttpApiService, private router: Router, private snackBar: MatSnackBar,
               private middleMan: MiddleManService) { }
  passenger: Passenger = {
    id: 0,
    name: '',
    checkedIn: false,
    wheelchairRequired: false,
    infants: false,
    ancillaryServices: '',
    seatNo: '',
    specialMeal: '',
    inflightShop: '',
    passport: '',
    address: '',
    dob: '',
    fid: 12233
  };

  ngOnInit(): void {
    this.service.getAllPassengers().subscribe((response: any) => {
      this.passenger.id = response.length + 1;
    });
    this.passenger.fid = this.middleMan.getFid();
    this.service.getSpecialMealByFid(this.passenger.fid).subscribe((response: SpecialMeal) => {
      this.specialMealData = this.specialMealData.concat(response[0].specialmeals);
    });
  }
  onWheelchairCheck(e: any): void {
    this.isCheckedWithInfant = !this.isCheckedWithInfant;
  }
  onWithInfantCheck(e: any): void {
    this.isCheckedWheelchair = !this.isCheckedWheelchair;
  }
  onFormSubmit(): void {
    if (this.passenger.name === '') {
      this.openSnackBar('Fields can not be empty', 'close');
    } else {
      if (this.wheelchairRequired === undefined) {
        this.wheelchairRequired = false;
      }
      if (this.withInfant === undefined) {
        this.withInfant = false;
      }
      if (this.selectedOption === undefined) {
        this.selectedOption = 'None';
      }
      this.passenger.wheelchairRequired = this.wheelchairRequired;
      this.passenger.infants = this.withInfant;
      this.passenger.specialMeal = this.selectedOption;
      console.log(this.passenger);

      this.service.addPassenger(this.passenger).subscribe((response: any) => {
        this.openSnackBar('Passenger Added', 'close');
      },
      (error) => {
        this.openSnackBar('Insert failed, duplicate Id', 'close');

      });
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 10000,
      verticalPosition: 'bottom',
    });
  }
}
