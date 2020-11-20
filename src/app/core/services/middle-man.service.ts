import { Injectable } from '@angular/core';
import { Passenger } from 'src/app/common-modules/shared/interfaces/passenger';

@Injectable({
  providedIn: 'root',
})
export class MiddleManService {
  private selectedPassenger: Passenger;
  currentFid: number;

  public seatConfig = [
    {
      seat_map: [
        {
          seat_label: '1',
          layout: 'xxx__xxx',
        },
        {
          seat_label: '2',
          layout: 'xxx__xxx',
        },
        {
          seat_label: '3',
          layout: 'xxx__xxx',
        },
        {
          seat_label: '4',
          layout: 'xxx__xxx',
        },
        {
          seat_label: '5',
          layout: 'xxx__xxx',
        },
        {
          seat_label: '6',
          layout: 'xxx__xxx',
        },
        {
          seat_label: '7',
          layout: 'xxx__xxx',
        },
        {
          seat_label: '8',
          layout: 'xxx__xxx',
        },
        {
          seat_label: '9',
          layout: 'xxx__xxx',
        },
        {
          seat_label: '10',
          layout: 'xxx__xxx',
        },
      ],
    },
  ];

  constructor() {}

  public setPassenger(passenger: Passenger): void {
    this.selectedPassenger = passenger;
  }

  public getPassenger(): Passenger {
    return this.selectedPassenger;
  }

  public setFid(flightId: number): void {
    this.currentFid = flightId;
  }

  public getFid(): number {
    return this.currentFid;
  }
}
