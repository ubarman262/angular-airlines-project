import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Passenger } from 'src/app/common-modules/shared/interfaces/passenger';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { MiddleManService } from 'src/app/core/services/middle-man.service';
import { AddAncillaryComponent } from '../add-ancillary/add-ancillary.component';
import { ChangeMealPrefComponent } from '../change-meal-pref/change-meal-pref.component';
import { SelectDialogComponent } from '../flight-list/dialogs/select-dialog/select-dialog.component';
import { ShopRequestComponent } from '../shop-request/shop-request.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'ancillary', 'specialmeal', 'seatNo', 'shoprequest'];
  passengerList: Passenger[] = [];
  dataSource: Passenger[];
  selection = new SelectionModel<Passenger>(false, []);
  filteredDataSource: Passenger[] = [];
  selectedOption: string;
  selectedPassenger: Passenger;
  @Input() flightId: number;

  constructor(private service: HttpApiService, public dialog: MatDialog,
              private middleMan: MiddleManService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.service.getPassengersByFlight(this.flightId).subscribe(
      (response: any) => {
        this.dataSource = response;
        this.filteredDataSource = this.dataSource;
      },
      errorResponse => { console.log(errorResponse); },
      );
  }
  public addAncillaryService(): void {
    if (this.selection.selected.length === 0) {
      this.openSnackBar('Select a Passenger', 'close');
    } else {
      this.selectedPassenger = this.selection.selected[0];
      this.middleMan.setPassenger(this.selectedPassenger);
      this.dialog.open(AddAncillaryComponent);
    }
  }
  public changeMeal(): void {
    if (this.selection.selected.length === 0) {
      this.openSnackBar('Select a Passenger', 'close');
    } else {
      this.selectedPassenger = this.selection.selected[0];
      this.middleMan.setPassenger(this.selectedPassenger);
      this.dialog.open(ChangeMealPrefComponent);
    }
  }
  public addshopRequest(): void {
    if (this.selection.selected.length === 0) {
      this.openSnackBar('Select a Passenger', 'close');
    } else {
      this.selectedPassenger = this.selection.selected[0];
      this.middleMan.setPassenger(this.selectedPassenger);
      this.dialog.open(ShopRequestComponent);
    }
  }
  openDialog(): void {
    this.dialog.open(SelectDialogComponent);
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 10000,
      verticalPosition: 'bottom',
    });
  }
}
