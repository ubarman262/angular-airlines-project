import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SelectDialogComponent } from '../flight-list/dialogs/select-dialog/select-dialog.component';

import { PassengerListComponent } from './passenger-list.component';

describe('PassengerListComponent', () => {
  let component: PassengerListComponent;
  let fixture: ComponentFixture<PassengerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerListComponent, SelectDialogComponent ],
      imports: [MatSnackBarModule, RouterTestingModule, BrowserAnimationsModule, HttpClientTestingModule, MatDialogModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerListComponent);
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

  it('addAncillaryService false condition', () => {
    component.selection.selected.length = 0;
    component.addAncillaryService();
    component.openSnackBar('Select a Passenger', 'close');
  });

  it('addAncillaryService true condition', () => {
    component.selection.selected.length = 1;
    const passenger = {
      fid: 1, address: 'WB', name: '', checkedIn: false, wheelchairRequired: false, ancillaryServices: '', dob: '', id: 1, infants: true,
      inflightShop: '', passport: '', seatNo: '', specialMeal: ''
    };
    component.addAncillaryService();
    component.selectedPassenger = passenger;
  });

  it('changeMeal false condition', () => {
    component.selection.selected.length = 0;
    component.changeMeal();
    component.openSnackBar('Select a Passenger', 'close');
  });

  it('changeMeal true condition', () => {
    component.selection.selected.length = 1;
    const passenger = {
      fid: 1, address: 'WB', name: '', checkedIn: false, wheelchairRequired: false, ancillaryServices: '', dob: '', id: 1, infants: true,
      inflightShop: '', passport: '', seatNo: '', specialMeal: ''
    };
    component.changeMeal();
    component.selectedPassenger = passenger;
  });

  it('addshopRequest false condition', () => {
    component.selection.selected.length = 0;
    component.addshopRequest();
    component.openSnackBar('Select a Passenger', 'close');
  });

  it('addshopRequest true condition', () => {
    component.selection.selected.length = 1;
    const passenger = {
      fid: 1, address: 'WB', name: '', checkedIn: false, wheelchairRequired: false, ancillaryServices: '', dob: '', id: 1, infants: true,
      inflightShop: '', passport: '', seatNo: '', specialMeal: ''
    };
    component.addshopRequest();
    component.selectedPassenger = passenger;
  });


});
