import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Flight } from 'src/app/common-modules/shared/interfaces/flight';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';
import { SelectDialogComponent } from '../dialogs/select-dialog/select-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['id', 'scheduleDate', 'time', 'source', 'destination'];
  flightList: Flight[] = [];
  dataSource: any;
  selection = new SelectionModel<Flight>(false, []);
  selected: boolean;
  ancillarySelect: boolean;
  currentFlightId: number;
  shopSelect: boolean;
  specialMealSelect: boolean;

  constructor(private service: HttpApiService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.selected = false;
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
    }
    else {
      this.selected = true;
      this.currentFlightId = this.selection.selected[0]?.id;
    }
  }

  public openAncillary(): void {
    if (this.selection.selected.length === 0) {
      this.openDialog();
    }
    else {
      this.ancillarySelect = true;
      this.currentFlightId = this.selection.selected[0]?.id;
    }
  }

  public openInflightShop(): void {
    if (this.selection.selected.length === 0) {
      this.openDialog();
    }
    else {
      this.shopSelect = true;
      this.currentFlightId = this.selection.selected[0]?.id;
    }
  }

  public openSpecialMealService(): void {
    if (this.selection.selected.length === 0) {
      this.openDialog();
    }
    else {
      this.specialMealSelect = true;
      this.currentFlightId = this.selection.selected[0]?.id;
    }
  }

  openDialog(): void {
    this.dialog.open(SelectDialogComponent);
  }

  public backToFlight(): void {
    this.selected = false;
    this.ancillarySelect = false;
    this.shopSelect = false;
    this.specialMealSelect = false;
  }

}
