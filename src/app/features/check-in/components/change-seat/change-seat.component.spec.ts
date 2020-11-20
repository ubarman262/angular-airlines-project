import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { ChangeSeatComponent } from './change-seat.component';

describe('ChangeSeatComponent', () => {
  let component: ChangeSeatComponent;
  let fixture: ComponentFixture<ChangeSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeSeatComponent ],
      imports: [MatSnackBarModule, RouterTestingModule, BrowserAnimationsModule, HttpClientTestingModule, MatDialogModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open snackbar', () => {
    component.openSnackBar('hello', 'close');
   });
});
