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

  it('should reset filter', () => {
    component.selectedOption = null;
    component.resetFilter();
    expect(component.selectedOption).toEqual(null);
  });

  it('should open select dialog', () => {
    component.openDialog();
  });

  it('change seat method false condition', () => {
    component.selection.selected.length = 0;
    component.changeSeat();
    component.openSnackBar('Select a Passenger', 'close');
  });

  it('change seat method true condition', () => {
    component.selection.selected.length = 1;
    const passenger = {
      fid: 1, address: 'WB', name: '', checkedIn: false, wheelchairRequired: false, ancillaryServices: '', dob: '', id: 1, infants: true,
      inflightShop: '', passport: '', seatNo: '', specialMeal: ''
    };
    component.changeSeat();
    component.selectedPassenger = passenger;
    component.openSnackBar('Select a Passenger', 'close');
  });

  // it('applyfilter method when wheelchair is true', () => {
  //   component.filteredDataSource = [];
  //   const filterValue = 'WheelChair';
  //   component.applyFilter(filterValue);
  //   const passenger1 = {
  //     fid: 1, address: 'WB', name: '', checkedIn: false, wheelchairRequired: true, ancillaryServices: '', dob: '', id: 1, infants: true,
  //     inflightShop: '', passport: '', seatNo: '', specialMeal: ''
  //   };
  //   const passenger2 = {
  //     fid: 1, address: 'WB', name: '', checkedIn: false, wheelchairRequired: false, ancillaryServices: '', dob: '', id: 1, infants: true,
  //     inflightShop: '', passport: '', seatNo: '', specialMeal: ''
  //   };
  //   component.filteredDataSource.push(passenger1);
  //   component.filteredDataSource.push(passenger2);
  //   for (const p of component.filteredDataSource) {
  //     expect(filterValue).toEqual('WheelChair');
  //     expect(p.wheelchairRequired).toBe(true);
  //     component.filteredDataSource.push(p);
  //   }
  //   expect(component.filteredDataSource).toContain(passenger1);
  // });
});
