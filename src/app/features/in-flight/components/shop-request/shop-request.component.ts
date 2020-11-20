import { Component, OnInit } from '@angular/core';
import { InflightshopService } from 'src/app/common-modules/shared/interfaces/inflightshop-service';
import { Passenger } from 'src/app/common-modules/shared/interfaces/passenger';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { MiddleManService } from 'src/app/core/services/middle-man.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-shop-request',
  templateUrl: './shop-request.component.html',
  styleUrls: ['./shop-request.component.scss']
})
export class ShopRequestComponent implements OnInit {
  selectedOption: string;
  options: string[] = ['None'];
  selectedPassenger: Passenger;
  flightId: number;
  constructor(private middleMan: MiddleManService, private service: HttpApiService, private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.selectedPassenger = this.middleMan.getPassenger();
    this.flightId = this.selectedPassenger?.fid;
    this.service.getInflightShopServiceByFid(this.flightId).subscribe((response: InflightshopService) => {
      this.options = this.options.concat(response[0].services);
    });
  }
  shopItem(): void {
    this.selectedPassenger.inflightShop = this.selectedOption;
    this.service.updatePassengerDetails(this.selectedPassenger).subscribe((response: Passenger) => {
      this.openSnackBar('Item added', 'close');
    });
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 10000,
      verticalPosition: 'bottom',
    });
  }
}
