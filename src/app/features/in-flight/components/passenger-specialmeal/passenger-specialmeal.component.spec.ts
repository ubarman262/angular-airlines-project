import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { PassengerSpecialmealComponent } from './passenger-specialmeal.component';

describe('PassengerSpecialmealComponent', () => {
  let component: PassengerSpecialmealComponent;
  let fixture: ComponentFixture<PassengerSpecialmealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerSpecialmealComponent ],
      imports: [MatSnackBarModule, RouterTestingModule, HttpClientTestingModule, MatDialogModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerSpecialmealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
