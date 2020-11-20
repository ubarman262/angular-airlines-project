import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpecialMeal } from 'src/app/common-modules/shared/interfaces/special-meal';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { SelectDialogComponent } from 'src/app/features/check-in/components/flight-list/dialogs/select-dialog/select-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-specialmeal-manage',
  templateUrl: './specialmeal-manage.component.html',
  styleUrls: ['./specialmeal-manage.component.scss']
})
export class SpecialmealManageComponent implements OnInit {

  @Input() flightId: number;
  displayedColumns: string[] = ['specialmeal', 'delete'];
  dataSource: string[] = [];
  mealId: number;
  specialMeal: SpecialMeal = {
    fid: 0,
    id: 0,
    specialmeals: this.displayedColumns
  };
  constructor(private service: HttpApiService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.service.getSpecialMealByFid(this.flightId).subscribe(
      (response: SpecialMeal) => {
        this.specialMeal = response[0];
        this.mealId = response[0].id;
        this.dataSource = this.specialMeal.specialmeals;
      });
  }

  addNewMeal(newMeal: string): void {
    if (newMeal === ''){
      this.openSnackBar('Field is Empty', 'close');

    } else {
      this.specialMeal?.specialmeals.push(newMeal);
      this.service.addSpecialMeal(this.mealId, this.specialMeal).subscribe(
        (response: any) => {
        });
      }
  }

  deleteMeal(meal: string): void {
    this.specialMeal.specialmeals = this.specialMeal?.specialmeals.filter(item => item !== meal);
    this.dataSource = this.specialMeal?.specialmeals;
    this.service.addSpecialMeal(this.mealId, this.specialMeal).subscribe(
      (response: any) => {
      });
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
