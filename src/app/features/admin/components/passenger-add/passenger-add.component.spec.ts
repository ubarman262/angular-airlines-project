import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PassengerAddComponent } from './passenger-add.component';
import { Passenger } from 'src/app/common-modules/shared/interfaces/passenger';

describe('PassengerAddComponent', () => {
  let component: PassengerAddComponent;
  let fixture: ComponentFixture<PassengerAddComponent>;

  const passenger: Passenger = {
    id: 1,
    name: 'ujjwal',
    address: 'wb',
    ancillaryServices: '',
    checkedIn: false,
    dob: '',
    fid: 12233,
    infants: false,
    inflightShop: '',
    passport: '',
    seatNo: '',
    specialMeal: '',
    wheelchairRequired: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerAddComponent ],
      imports: [MatSnackBarModule, BrowserAnimationsModule, RouterTestingModule, HttpClientTestingModule, MatDialogModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open snackbar', () => {
    component.openSnackBar('hello', 'close');
   });

  it('submitting should not submit since name is blank', () => {
    passenger.name = '';
    passenger.passport = '12345';
    passenger.address = 'wb';
    expect(component.onFormSubmit()).toEqual(component.openSnackBar('Fields can not be empty', 'close'));
  });

  it('submitting should not submit since passport is blank', () => {
    passenger.name = 'ujjwal';
    passenger.passport = '';
    passenger.address = 'wb';
    expect(component.onFormSubmit()).toEqual(component.openSnackBar('Fields can not be empty', 'close'));
  });

  it('submitting should not submit since address is blank', () => {
    passenger.name = 'ujjwal';
    passenger.passport = '12345';
    passenger.address = '';
    expect(component.onFormSubmit()).toEqual(component.openSnackBar('Fields can not be empty', 'close'));
  });

  it('submitting form', () => {
    component.passenger.name = 'ujjwal';
    component.passenger.passport = '23456';
    component.passenger.address = 'WB';
    component.onFormSubmit();
    component.openSnackBar('Passenger Added', 'close');
  });
});
