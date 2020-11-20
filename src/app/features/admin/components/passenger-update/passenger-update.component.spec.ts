import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PassengerUpdateComponent } from './passenger-update.component';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PassengerUpdateComponent', () => {
  let component: PassengerUpdateComponent;
  let fixture: ComponentFixture<PassengerUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerUpdateComponent ],
      imports: [FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MatSnackBarModule, RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.SignupForm = new FormGroup({
      userData: new FormGroup({
        name: new FormControl(''),
        passport: new FormControl(''),
        address: new FormControl(''),
        dob: new FormControl('')
      })
    });
  });

  const passenger = {
    fid: 1, address: 'WB', name: 'ujjwal', checkedIn: false, wheelchairRequired: false,
    ancillaryServices: '', dob: '1996-06-10', id: 1, infants: true,
    inflightShop: '', passport: '1234f', seatNo: '', specialMeal: ''
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change set value to true', () => {
    component.change = true;
    component.setChange();
    expect(component.change).toEqual(true);
  });

  it('should update passenger details', () => {
    component.passenger = passenger;
    component.onUpdate();

    component.SignupForm.patchValue({
      userData: {
        name: passenger?.name,
        passport: passenger?.passport,
        address: passenger?.address,
        dob: passenger?.dob
      }
    });

    component.passenger.name = component.SignupForm.value.userData?.name;
    component.passenger.passport = component.SignupForm.value.userData?.passport;
    component.passenger.address = component.SignupForm.value.userData?.address;
    component.passenger.dob = component.SignupForm.value.userData?.dob;
    expect(component.passenger.name).toEqual(component.SignupForm.value.userData?.name);
  });

  it('should open snackbar', () => {
    component.openSnackBar('hello', 'close');
   });
});
