import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SelectDialogComponent } from '../dialogs/select-dialog/select-dialog.component';

import { SpecialmealManageComponent } from './specialmeal-manage.component';

describe('SpecialmealManageComponent', () => {
  let component: SpecialmealManageComponent;
  let fixture: ComponentFixture<SpecialmealManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialmealManageComponent, SelectDialogComponent ],
      imports: [MatSnackBarModule, RouterTestingModule, BrowserAnimationsModule, HttpClientTestingModule, MatDialogModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialmealManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open snackbar', () => {
    component.openSnackBar('hello', 'close');
   });

  it('should open select dialog', () => {
    component.openDialog();
   });

  it('should add new service', () => {
    const newMeal = 'food';
    component.addNewMeal(newMeal);
  });

  it('should show field is empty', () => {
    const newMeal = '';
    component.addNewMeal(newMeal);
    component.openSnackBar('Field is empty', 'close');
  });

  it('should delete service', () => {
    const newMeal = 'food';
    component.deleteMeal(newMeal);
  });
});
