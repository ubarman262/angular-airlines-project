import { Component, Input, OnInit } from '@angular/core';
import { Passenger } from 'src/app/common-modules/shared/interfaces/passenger';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { MiddleManService } from 'src/app/core/services/middle-man.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-seat',
  templateUrl: './change-seat.component.html',
  styleUrls: ['./change-seat.component.scss']
})
export class ChangeSeatComponent implements OnInit {
  selectedSeat: string;
  currentPassenger: Passenger;
  occupiedSeatList: string[] = [];
  passengerList: Passenger[];
  seatMapArray: string[] = [];
  initialChar: string;
  availableSeats: string[] = [];

  constructor(private service: HttpApiService, private middleMan: MiddleManService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.currentPassenger = this.middleMan.getPassenger();
    this.service.getPassengersByFlight(this.currentPassenger?.fid).subscribe(
      (response: any) => {
        this.passengerList = response;
        this.seatMapGenerator();
      },
      errorResponse => { console.log(errorResponse); },
      );
  }

  changeSeat(): void {
    const seatNo = this.selectedSeat;
    this.currentPassenger.seatNo = seatNo.toUpperCase();
    this.service.updatePassenngerSeat(this.currentPassenger).subscribe(
          (response: any) => {
            this.openSnackBar('Seat Updated', 'close');
          },
          () => {
            this.openSnackBar('Failed to update seat', 'close');
          }
        );
        }

openSnackBar(message: string, action: string): void {
  this.snackBar.open(message, action, {
    duration: 10000,
    verticalPosition: 'bottom',
  });
}

seatMapGenerator(): void {
 this.initialChar = 'A';
 let seat = '';
 let j = 0;
 for (let i = 0; i < 60; i++) {
   if (i % 6 === 0) {
     j++;
     this.initialChar = 'A';
   }
   seat = j + this.initialChar;
   this.initialChar = String.fromCharCode(this.initialChar.charCodeAt(0) + 1);
   this.seatMapArray.push(seat);
 }
 this.occupiedSeatList = [];
 for (const passenger of this.passengerList) {
      this.occupiedSeatList.push(passenger.seatNo);
    }
 this.availableSeats = this.seatMapArray.filter( ( el ) => !this.occupiedSeatList.includes( el ) );
}
}
