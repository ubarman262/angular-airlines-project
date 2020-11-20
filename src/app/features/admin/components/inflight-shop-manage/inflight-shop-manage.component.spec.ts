import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InflightShopManageComponent } from './inflight-shop-manage.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { SelectDialogComponent } from '../dialogs/select-dialog/select-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('InflightShopManageComponent', () => {
  let component: InflightShopManageComponent;
  let fixture: ComponentFixture<InflightShopManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InflightShopManageComponent, SelectDialogComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule, MatSnackBarModule, BrowserAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InflightShopManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open select dialog', () => {
    component.openDialog();
   });

  it('should open snackbar', () => {
    component.openSnackBar('hello', 'close');
   });

  it('should add new service', () => {
    const newService = 'phone';
    component.addNewService(newService);
  });

  it('should show field is empty', () => {
    const newService = '';
    component.addNewService(newService);
    component.openSnackBar('Field is empty', 'close');
  });

  it('should delete service', () => {
    const newService = 'phone';
    component.deleteService(newService);
  });
});
