import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { AddAncillaryComponent } from './add-ancillary.component';

describe('AddAncillaryComponent', () => {
  let component: AddAncillaryComponent;
  let fixture: ComponentFixture<AddAncillaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAncillaryComponent ],
      imports: [ HttpClientTestingModule, BrowserAnimationsModule, RouterTestingModule, MatDialogModule, MatSnackBarModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAncillaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.selectedPassenger = {id: 1,
      name: 'ujjwal',
      checkedIn: false,
      wheelchairRequired: false,
      infants: false,
      ancillaryServices: 'wifi',
      seatNo: '3F',
      specialMeal: 'burger',
      inflightShop: 'none',
      passport: '76a76d876f',
      address: 'WB',
      dob: '2012-10-06',
      fid: 12233};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open snackbar', () => {
    component.openSnackBar('test', 'close');
   });

  it('should addAncillary', () => {
    component.addAncillary();
    component.openSnackBar('Service Added', 'close');
   });
});
