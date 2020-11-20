import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Passenger } from 'src/app/common-modules/shared/interfaces/passenger';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { MiddleManService } from 'src/app/core/services/middle-man.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-passenger-update',
  templateUrl: './passenger-update.component.html',
  styleUrls: ['./passenger-update.component.scss']
})
export class PassengerUpdateComponent implements OnInit {
  change: boolean;
  constructor(private formBuilder: FormBuilder, private service: HttpApiService,
              private router: Router, private middleMan: MiddleManService, private snackBar: MatSnackBar
              ) { }
  SignupForm: FormGroup;
  status = false;
  passenger: Passenger;

  ngOnInit(): void {
    this.passenger = this.middleMan.getPassenger();
    this.SignupForm = new FormGroup({
      userData: new FormGroup({
        name: new FormControl(null, [
          Validators.required
        ]),
        passport: new FormControl(null, [
          Validators.required
        ]),
        address: new FormControl(null, [
          Validators.required
        ]),
        dob: new FormControl(null, [
          Validators.required
        ])
      })
    });

    this.SignupForm.patchValue({
      userData: {
        name: this.passenger?.name,
        passport: this.passenger?.passport,
        address: this.passenger?.address,
        dob: this.passenger?.dob
      },
    });
  }

  onUpdate(): void {
    this.passenger.name = this.SignupForm.value.userData?.name;
    this.passenger.passport = this.SignupForm.value.userData?.passport;
    this.passenger.address = this.SignupForm.value.userData?.address;
    this.passenger.dob = this.SignupForm.value.userData?.dob;
    this.service.updatePassengerDetails(this.passenger).subscribe(
    (response: any) => {
      this.openSnackBar('Information Updated', 'close');
    });
  }

  setChange(): void {
    this.change = true;
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 10000,
      verticalPosition: 'bottom',
    });
  }
}
