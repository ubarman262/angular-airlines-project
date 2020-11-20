import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InflightshopService } from 'src/app/common-modules/shared/interfaces/inflightshop-service';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { SelectDialogComponent } from 'src/app/features/check-in/components/flight-list/dialogs/select-dialog/select-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-inflight-shop-manage',
  templateUrl: './inflight-shop-manage.component.html',
  styleUrls: ['./inflight-shop-manage.component.scss']
})
export class InflightShopManageComponent implements OnInit {

  @Input() flightId: number;
  displayedColumns: string[] = ['inflightshop', 'delete'];
  dataSource: string[] = [];
  serviceId: number;
  inflightShop: InflightshopService = {fid: 1, id: 1, services: this.displayedColumns};
  constructor(private service: HttpApiService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.service.getInflightShopServiceByFid(this.flightId).subscribe(
      (response: InflightshopService) => {
       this.inflightShop = response[0];
       this.serviceId = response[0].id;
       this.dataSource = this.inflightShop.services;
      },
      () => {
      },
    );
  }

  addNewService(newService: string): void {
    if (newService === ''){
      this.openSnackBar('Field is Empty', 'close');
    }
    else {
      this.inflightShop.services.push(newService);
      this.service.addInflightShopService(this.serviceId, this.inflightShop).subscribe(
        (response: any) => {
        },
        () => {},
        );
      }
  }

  deleteService(service: string): void {
    this.inflightShop.services = this.inflightShop?.services.filter(item => item !== service);
    this.dataSource = this.inflightShop?.services;
    this.service.addInflightShopService(this.serviceId, this.inflightShop).subscribe(
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
