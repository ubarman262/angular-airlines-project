import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { SelectDialogComponent } from '../dialogs/select-dialog/select-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AncillaryManageComponent } from './ancillary-manage.component';

describe('AncillaryManageComponent', () => {
  let component: AncillaryManageComponent;
  let fixture: ComponentFixture<AncillaryManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AncillaryManageComponent, SelectDialogComponent ],
      imports: [FormsModule, ReactiveFormsModule,  MatSnackBarModule,
        RouterTestingModule, HttpClientTestingModule, MatDialogModule, BrowserAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AncillaryManageComponent);
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
    const newService = 'wifi';
    component.addNewService(newService);
  });

  it('should show field is empty', () => {
    const newService = '';
    component.addNewService(newService);
    component.openSnackBar('Field is empty', 'close');
  });

  it('should delete service', () => {
    const newService = 'wifi';
    component.deleteService(newService);
  });


});
