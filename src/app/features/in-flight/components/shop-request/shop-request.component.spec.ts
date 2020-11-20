import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SelectDialogComponent } from '../flight-list/dialogs/select-dialog/select-dialog.component';
import { ShopRequestComponent } from './shop-request.component';

describe('ShopRequestComponent', () => {
  let component: ShopRequestComponent;
  let fixture: ComponentFixture<ShopRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopRequestComponent, SelectDialogComponent ],
      imports: [ HttpClientTestingModule, BrowserAnimationsModule, RouterTestingModule, MatDialogModule, MatSnackBarModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open snackbar', () => {
    component.openSnackBar('test', 'close');
   });

  it('should add item and open snackbar', () => {
    const passenger = {
      fid: 1, address: 'WB', name: '', checkedIn: false, wheelchairRequired: false, ancillaryServices: '', dob: '', id: 1, infants: true,
      inflightShop: '', passport: '', seatNo: '', specialMeal: ''
    };
    component.selectedPassenger = passenger;
    component.shopItem();
    component.selectedPassenger.inflightShop = 'item';
    expect(component.selectedPassenger.inflightShop).toEqual('item');
    component.openSnackBar('Item added', 'close');
   });
});
