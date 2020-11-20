import { Component, Input, OnInit } from '@angular/core';
import { Passenger } from 'src/app/common-modules/shared/interfaces/passenger';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { MiddleManService } from 'src/app/core/services/middle-man.service';

@Component({
  selector: 'app-passenger-specialmeal',
  templateUrl: './passenger-specialmeal.component.html',
  styleUrls: ['./passenger-specialmeal.component.scss']
})
export class PassengerSpecialmealComponent implements OnInit {
  seatConfig: any = null;
  seatmap = [];
  initialchar = 'A';
  @Input() flightId: number;
  passengerList: Passenger[] = [];
  passenger: Passenger;
  wheelChair: string[] = [];
  mealsSeatList: string[] = [];
  withInfants: string[] = [];
  constructor(private service: HttpApiService, private middleMan: MiddleManService) { }
  seatChartConfig = {
      showRowsLabel: false,
      showRowWisePricing: false,
      newSeatNoForRow: false
  };
  cart = {
      selectedSeats: [],
      seatstoStore: []
  };

  async ngOnInit(): Promise<void> {
    await this.service.getPassengersByFlight(this.flightId).toPromise().then((response: any) => {
      this.passengerList = response;
      this.passengerList.forEach(passenger => {
        if (passenger.specialMeal !== 'None' && passenger.specialMeal !== '') {
          this.mealsSeatList.push(passenger.seatNo);
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
                          status: 'No-SpecialMeal'
                      };
                      if (item !== '_') {
                          // tslint:disable-next-line: no-string-literal
                          seatObj['seatLabel'] = mapElement.seat_label + this.initialchar;
                          this.initialchar = String.fromCharCode(this.initialchar.charCodeAt(0) + 1);
                          // tslint:disable-next-line: prefer-for-of
                          for (let i = 0; i < this.mealsSeatList.length; i++) {
                            // tslint:disable-next-line: no-string-literal
                            if (seatObj['seatLabel'] === this.mealsSeatList[i]) {
                                // tslint:disable-next-line: no-string-literal
                                seatObj['status'] = 'SpecialMeal';
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
}
