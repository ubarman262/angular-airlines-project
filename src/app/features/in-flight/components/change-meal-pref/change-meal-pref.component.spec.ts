import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { ChangeMealPrefComponent } from './change-meal-pref.component';

describe('ChangeMealPrefComponent', () => {
  let component: ChangeMealPrefComponent;
  let fixture: ComponentFixture<ChangeMealPrefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMealPrefComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule, MatDialogModule, MatSnackBarModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMealPrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open snackbar', () => {
    component.openSnackBar('test', 'close');
   });

  it('change meal method', () => {
    const passenger = {
      fid: 1, address: 'WB', name: '', checkedIn: false, wheelchairRequired: false, ancillaryServices: '', dob: '', id: 1, infants: true,
      inflightShop: '', passport: '', seatNo: '', specialMeal: ''
    };
    const option = 'burger';
    component.selectedOption = option;
    component.selectedPassenger = passenger;
    component.selectedPassenger.specialMeal = component.selectedOption;
    component.changeMeal();
    component.openSnackBar('Meal Updated', 'close');
   });

});
