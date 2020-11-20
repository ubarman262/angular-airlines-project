import { Component, Input, OnInit } from '@angular/core';
import { Passenger } from 'src/app/common-modules/shared/interfaces/passenger';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { MiddleManService } from 'src/app/core/services/middle-man.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {
  seatConfig: any = null;
  seatmap = [];
  initialchar = 'A';
  @Input() flightId: number;
  passengerList: Passenger[] = [];
  passenger: Passenger;
  wheelChair: string[] = [];
  checkedIn: string[] = [];
  withInfants: string[] = [];
  seatChartConfig = {
    showRowsLabel: false,
    showRowWisePricing: false,
    newSeatNoForRow: false
  };
  constructor(private service: HttpApiService, private middleMan: MiddleManService, private snackBar: MatSnackBar) { }
  async ngOnInit(): Promise<void> {
    await this.service.getPassengersByFlight(this.flightId).toPromise().then((response: any) => {
      this.passengerList = response;
      this.passengerList.forEach(passenger => {
        if (passenger.checkedIn === true) {
          this.checkedIn.push(passenger.seatNo);
        }
        if (passenger.wheelchairRequired === true) {
          this.wheelChair.push(passenger.seatNo);
        }
        if (passenger.infants === true) {
          this.withInfants.push(passenger.seatNo);
        }
      });
    });
    this.seatConfig = this.middleMan.seatConfig;
    this.processSeatChart(this.seatConfig);
  }

  public processSeatChart(mapData: any[]): void {
      if (mapData.length > 0) {
          let seatNoCounter = 1;
          // tslint:disable-next-line: prefer-for-of
          for (let counter = 0; counter < mapData.length; counter++) {
              let rowLabel = '';
              const itemMap = mapData[counter].seat_map;
              itemMap.forEach((mapElement: any) => {
                  const mapObj = {
                      seatRowLabel: mapElement.seat_label,
                      seats: [],
                  };
                  rowLabel = '';
                  const seatValArr = mapElement.layout.split('');
                  let totalItemCounter = 1;
                  seatValArr.forEach((item: any) => {
                      const seatObj = {
                          status: 'unchecked'
                      };
                      if (item !== '_') {
                          // tslint:disable-next-line: no-string-literal
                          seatObj['seatLabel'] = mapElement.seat_label + this.initialchar;
                          this.initialchar = String.fromCharCode(this.initialchar.charCodeAt(0) + 1);
                          // tslint:disable-next-line: prefer-for-of
                          for (let i = 0; i < this.checkedIn.length; i++) {
                            // tslint:disable-next-line: no-string-literal
                            if (seatObj['seatLabel'] === this.checkedIn[i]) {
                                // tslint:disable-next-line: no-string-literal
                                seatObj['status'] = 'checkedIn';
                            }
                        }
                          // tslint:disable-next-line: prefer-for-of
                          for (let i = 0; i < this.wheelChair.length; i++) {
                              // tslint:disable-next-line: no-string-literal
                              if (seatObj['seatLabel'] === this.wheelChair[i]) {
                                // tslint:disable-next-line: no-string-literal
                                seatObj['status'] = 'wheelChair';
                                // tslint:disable-next-line: no-string-literal
                                if (this.checkedIn.includes(seatObj['seatLabel'])) {
                                  // tslint:disable-next-line: no-string-literal
                                  seatObj['status'] = 'wheelChairCheckedIn';
                                }
                              }
                          }
                          // tslint:disable-next-line: prefer-for-of
                          for (let i = 0; i < this.withInfants.length; i++) {
                              // tslint:disable-next-line: no-string-literal
                              if (seatObj['seatLabel'] === this.withInfants[i]) {
                                  // tslint:disable-next-line: no-string-literal
                                  seatObj['status'] = 'withInfants';
                                  // tslint:disable-next-line: no-string-literal
                                  if (this.checkedIn.includes(seatObj['seatLabel'])) {
                                    // tslint:disable-next-line: no-string-literal
                                    seatObj['status'] = 'withInfantCheckedIn';
                                  }
                              }
                          }
                          if (seatNoCounter % 6 === 0) {
                              this.initialchar = 'A';
                          }
                          if (seatNoCounter <= 60) {
                            // tslint:disable-next-line: no-string-literal
                            seatObj['seatNo'] = seatObj['seatLabel'];
                        }
                          // tslint:disable-next-line: no-string-literal
                          else { seatObj['seatNo'] = '' + seatNoCounter; }
                          seatNoCounter++;
                      } else {
                          // tslint:disable-next-line: no-string-literal
                          seatObj['seatLabel'] = '';
                      }
                      totalItemCounter++;
                      // tslint:disable-next-line: no-string-literal
                      mapObj['seats'].push(seatObj);
                  });
                  this.seatmap.push(mapObj);
              });
          }
      }
  }
  public selectSeat(seatObject: any): void {
      if (seatObject.status === 'unchecked') {
        this.passengerList.forEach(currentPassenger => {
          if (currentPassenger.seatNo === seatObject.seatNo) {
              seatObject.status = 'checkedIn';
              currentPassenger.checkedIn = true;
              this.sendStateToDB(currentPassenger);
              this.openSnackBar('Checked-In', 'close');
            }
            else {
              this.openSnackBar('Seat Not Allocated', 'close');
            }
          });
      } else if (seatObject.status === 'checkedIn') {
          seatObject.status = 'unchecked';
          this.passengerList.forEach(currentPassenger => {
            if (currentPassenger.seatNo === seatObject.seatNo) {
              currentPassenger.checkedIn = false;
              this.sendStateToDB(currentPassenger);
              this.openSnackBar('Unchecked', 'close');
            }
          });
      } else if (seatObject.status === 'wheelChair') {
        seatObject.status = 'wheelChairCheckedIn';
        this.passengerList.forEach(currentPassenger => {
          if (currentPassenger.seatNo === seatObject.seatNo) {
            currentPassenger.checkedIn = true;
            this.sendStateToDB(currentPassenger);
            this.openSnackBar('Checked-In', 'close');
          }
        });
      } else if (seatObject.status === 'withInfants') {
        seatObject.status = 'withInfantCheckedIn';
        this.passengerList.forEach(currentPassenger => {
          if (currentPassenger.seatNo === seatObject.seatNo) {
            currentPassenger.checkedIn = true;
            this.sendStateToDB(currentPassenger);
            this.openSnackBar('Checked-In', 'close');
          }
        });
      } else if (seatObject.status === 'wheelChairCheckedIn') {
        seatObject.status = 'wheelChair';
        this.passengerList.forEach(currentPassenger => {
          if (currentPassenger.seatNo === seatObject.seatNo) {
            currentPassenger.checkedIn = false;
            this.sendStateToDB(currentPassenger);
            this.openSnackBar('Unchecked', 'close');
          }
        });
      } else if (seatObject.status === 'withInfantCheckedIn') {
        seatObject.status = 'withInfants';
        this.passengerList.forEach(currentPassenger => {
          if (currentPassenger.seatNo === seatObject.seatNo) {
            currentPassenger.checkedIn = false;
            this.sendStateToDB(currentPassenger);
            this.openSnackBar('Unchecked', 'close');
          }
        });
      }
  }
  sendStateToDB(passenger: Passenger): void {
    this.service.updatePassengerDetails(passenger).subscribe((response: Passenger) => {
    });
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 10000,
      verticalPosition: 'bottom',
    });
  }
}
