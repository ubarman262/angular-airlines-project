import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Passenger } from 'src/app/common-modules/shared/interfaces/passenger';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { MiddleManService } from 'src/app/core/services/middle-man.service';
import { ChangeSeatComponent } from '../change-seat/change-seat.component';
import { SelectDialogComponent } from '../flight-list/dialogs/select-dialog/select-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'ancillary', 'seatNo', 'checkedIn'];
  passengerList: Passenger[] = [];
  dataSource: Passenger[];
  selection = new SelectionModel<Passenger>(false, []);
  filtersOptions = ['WheelChair', 'CheckedIn', 'Infants'];
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

  applyFilter(filterValue: string): void {
    this.filteredDataSource = [];
    for (const passenger of this.dataSource) {
      if (filterValue === 'WheelChair') {
        if (passenger.wheelchairRequired === true) {
          this.filteredDataSource.push(passenger);
        }
      }
      else if (filterValue === 'CheckedIn') {
        if (passenger.checkedIn === true) {
          this.filteredDataSource.push(passenger);
        }
      }
      else if (filterValue === 'Infants') {
        if (passenger.infants === true) {
          this.filteredDataSource.push(passenger);
        }
      }
  }
  }

  resetFilter(): void {
    this.selectedOption = null;
    this.filteredDataSource = this.dataSource;
  }

  public changeSeat(): void {
    if (this.selection.selected.length === 0) {
      this.openSnackBar('Select a Passenger', 'close');
    } else {
      this.selectedPassenger = this.selection.selected[0];
      this.middleMan.setPassenger(this.selectedPassenger);
      this.dialog.open(ChangeSeatComponent);
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
