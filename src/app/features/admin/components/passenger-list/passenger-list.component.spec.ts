import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { SelectDialogComponent } from '../dialogs/select-dialog/select-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PassengerListComponent } from './passenger-list.component';
import { PassengerUpdateComponent } from '../passenger-update/passenger-update.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


describe('PassengerListComponent', () => {
  let component: PassengerListComponent;
  let fixture: ComponentFixture<PassengerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerListComponent, SelectDialogComponent, PassengerUpdateComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule, FormsModule,
        RouterTestingModule, BrowserAnimationsModule, MatDialogModule, MatSnackBarModule]
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

  it('should set select value to false', () => {
    component.backToPassengerList();
    expect(component.selected).toEqual(false);
   });

  it('should reset filter', () => {
    component.selectedOption = null;
    component.resetFilter();
    expect(component.selectedOption).toEqual(null);
    // expect(component.filteredDataSource).toEqual(component.dataSource);
  });

  it('should show no passenger selected dialog', () => {
    component.selection.selected.length = 0;
    component.updatePassenger();
    component.openSnackBar('Please select passenger', 'close');
  });

  it('should show passenger passenger updated', () => {
    component.selection.selected.length = 1;
    const passenger = {
      fid: 1, address: 'WB', name: '', checkedIn: false, wheelchairRequired: false, ancillaryServices: '', dob: '', id: 1, infants: true,
      inflightShop: '', passport: '', seatNo: '', specialMeal: ''
    };
    component.updatePassenger();
    component.selectedPassenger = passenger;
    component.openUpdatePassengerDialog();
  });

  it('should open updatepassenger component as dialog', () => {
    component.openUpdatePassengerDialog();
  });


});
