import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AncillaryService } from 'src/app/common-modules/shared/interfaces/ancillary-service';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { SelectDialogComponent } from '../dialogs/select-dialog/select-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-ancillary-manage',
  templateUrl: './ancillary-manage.component.html',
  styleUrls: ['./ancillary-manage.component.scss']
})
export class AncillaryManageComponent implements OnInit {

  @Input() flightId: number;
  displayedColumns: string[] = ['ancillaryServices', 'delete'];
  dataSource: string[] = [];
  serviceId: number;
  ancillaryService: AncillaryService = {fid: 0, id: 1, services: this.displayedColumns};
  constructor(private service: HttpApiService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.service.getAncillaryServiceByFid(this.flightId).subscribe(
      (response: AncillaryService) => {
       this.ancillaryService = response[0];
       this.serviceId = response[0].id;
       this.dataSource = this.ancillaryService?.services;
      },
      () => {
      },
    );
  }

  addNewService(newService: string): void {
    if (newService === ''){
      this.openSnackBar('Field is empty', 'close');
    }
    else {
      this.ancillaryService?.services.push(newService);
      this.service.addAncillaryService(this.serviceId, this.ancillaryService).subscribe(
        (response: any) => {
        },
        () => {},
        );
      }
  }

  deleteService(service: string): void {
    this.ancillaryService.services = this.ancillaryService?.services.filter(item => item !== service);
    this.dataSource = this.ancillaryService?.services;
    this.service.addAncillaryService(this.serviceId, this.ancillaryService).subscribe(
      (response: any) => {
      },
      () => {},
    );
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
