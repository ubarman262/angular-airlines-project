import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Flight } from 'src/app/common-modules/shared/interfaces/flight';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { SelectDialogComponent } from './dialogs/select-dialog/select-dialog.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { FlightDetailsComponent } from '../flight-details/flight-details.component';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'scheduleDate', 'time', 'source', 'destination'];
  flightList: Flight[] = [];
  dataSource: any;
  selection = new SelectionModel<Flight>(false, []);
  selected: boolean;
  currentFlightId: number;
  flightdetailStatus: boolean;

  constructor(private service: HttpApiService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.selected = false;
    this.flightdetailStatus = false;
    this.service.getFlights().subscribe(
      (response: any) => {
        this.flightList = response;
        this.dataSource = this.flightList;
      },
      () => {
        this.dialog.open(ErrorDialogComponent);
      },
    );
  }

  public selectFlight(): void {
    if (this.selection.selected.length === 0) {
      this.openDialog();
    } else {
      this.selected = true;
      this.currentFlightId = this.selection.selected[0]?.id;
    }
  }
  openDialog(): void {
    this.dialog.open(SelectDialogComponent);
  }
  public backToFlight(): void {
    this.selected = false;
    this.flightdetailStatus = false;
  }
  public flightCheckIn(): void {
    if (this.selection.selected.length === 0) {
      this.openDialog();
    } else {
    this.currentFlightId = this.selection.selected[0]?.id;
    this.flightdetailStatus = true;
    }
  }
}
