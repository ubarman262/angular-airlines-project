import { Component, OnInit } from '@angular/core';
import { AncillaryService } from 'src/app/common-modules/shared/interfaces/ancillary-service';
import { Passenger } from 'src/app/common-modules/shared/interfaces/passenger';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { MiddleManService } from 'src/app/core/services/middle-man.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-ancillary',
  templateUrl: './add-ancillary.component.html',
  styleUrls: ['./add-ancillary.component.scss']
})
export class AddAncillaryComponent implements OnInit {
  selectedOption: string;
  options: string[] = ['None'];
  selectedPassenger: Passenger;
  flightId: number;


  constructor(private middleMan: MiddleManService, private service: HttpApiService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.selectedPassenger = this.middleMan.getPassenger();
    this.flightId = this.selectedPassenger?.fid;
    this.service.getAncillaryServiceByFid(this.flightId).subscribe((response: AncillaryService) => {
      this.options = this.options.concat(response[0].services);
    });
  }
  addAncillary(): void {
    this.selectedPassenger.ancillaryServices = this.selectedOption;
    this.service.updatePassengerDetails(this.selectedPassenger).subscribe((response: Passenger) => {
      this.openSnackBar('Service Added', 'close');
    });
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 10000,
      verticalPosition: 'bottom',
    });
  }
}
