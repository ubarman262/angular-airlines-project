import { SelectionModel } from '@angular/cdk/collections';
import { Component, DoCheck, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Passenger } from 'src/app/common-modules/shared/interfaces/passenger';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { MiddleManService } from 'src/app/core/services/middle-man.service';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';
import { PassengerAddComponent } from '../passenger-add/passenger-add.component';
import { PassengerUpdateComponent } from '../passenger-update/passenger-update.component';
import {MatSnackBar} from '@angular/material/snack-bar';

interface Filter {
  value: string;
  name: string;
}

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'ancillary', 'seatNo', 'passport', 'address', 'dob'];
  passengerList: Passenger[] = [];
  dataSource: Passenger[];
  selection = new SelectionModel<Passenger>(false, []);
  filtersOptions: Filter[] = [
    {value: 'passport', name: 'Passport'},
    {value: 'address', name: 'Address'},
    {value: 'dob', name: 'Date Of Birth'}
  ];
  filteredDataSource: Passenger[] = [];
  selectedOption: string;
  @Input() flightId: number;
  selected: boolean;
  selectedPassenger: Passenger;

  constructor(private snackBar: MatSnackBar, private service: HttpApiService,
              public dialog: MatDialog, private middleMan: MiddleManService) { }

  ngOnInit(): void {
    this.selected = false;
    this.service.getPassengersByFlight(this.flightId).subscribe(
      (response: any) => {
        this.dataSource = response;
        this.filteredDataSource = this.dataSource;

      },
      () => {
        this.dialog.open(ErrorDialogComponent);
      }
      );
  }

  applyFilter(filterValue: string): void {
    this.filteredDataSource = [];
    for (const passenger of this.dataSource) {
      if (filterValue === 'passport') {
        if (passenger.passport === '') {
          this.filteredDataSource.push(passenger);
        }
      } else if (filterValue === 'address') {
        if (passenger.address === '') {
          this.filteredDataSource.push(passenger);
        }
      } else if (filterValue === 'dob') {
        if (passenger.dob === '') {
          this.filteredDataSource.push(passenger);
        }
      }
  }
  }

  resetFilter(): void {
    this.selectedOption = null;
    this.filteredDataSource = this.dataSource;
  }

  updatePassenger(): void {
    if (this.selection.selected.length === 0) {
      this.openSnackBar('Please select passenger', 'close');
    } else {
      this.selected = true;
      this.selectedPassenger = this.selection.selected[0];
      this.middleMan.setPassenger(this.selectedPassenger);
      this.openUpdatePassengerDialog();
    }
  }

  public backToPassengerList(): void {
    this.selected = false;
  }

  openUpdatePassengerDialog(): void {
    this.dialog.open(PassengerUpdateComponent);
  }

  addPassenger(): void {
    this.middleMan.setFid(this.flightId);
    const dialogRef = this.dialog.open(PassengerAddComponent);
    dialogRef.afterClosed().subscribe((e) => {
      this.service.getPassengersByFlight(this.flightId).subscribe(
        (response: any) => {
          this.dataSource = response;
          this.filteredDataSource = this.dataSource;
        },
        () => {
          this.dialog.open(ErrorDialogComponent);
        }
        );
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 10000,
      verticalPosition: 'bottom',
    });
  }


}
