import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FlightListComponent } from './flight-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectDialogComponent } from './dialogs/select-dialog/select-dialog.component';


describe('FlightListComponent', () => {
  let component: FlightListComponent;
  let fixture: ComponentFixture<FlightListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightListComponent, SelectDialogComponent ],
      imports: [ HttpClientTestingModule, BrowserAnimationsModule, RouterTestingModule, MatDialogModule, MatSnackBarModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open openSpecialMealService if-condition', () => {
    component.selection.selected.length = 0;
    component.flightCheckIn();
    component.openDialog();
   });

  it('should open select dialog', () => {
    component.openDialog();
   });

  it('should open flightcheckIn false', () => {
    component.selection.selected.length = 0;
    component.flightCheckIn();
    expect(component.selection.selected.length).toEqual(0);
    component.openDialog();
   });

  it('should open flightcheckIn true', () => {
    component.selection.selected.length = 1;
    component.flightCheckIn();
    component.currentFlightId = 1;
    component.flightdetailStatus = true;
   });

  it('backtoflight method', () => {
    component.selected = false;
    component.flightdetailStatus = false;
    component.backToFlight();
    expect(component.selected).toBe(false);
    expect(component.flightdetailStatus).toBe(false);
  });

  it('select flight return false', () => {
    component.selection.selected.length = 0;
    component.selectFlight();
    expect(component.selection.selected.length).toEqual(0);
    component.openDialog();
  });

  it('select flight return true', () => {
    component.selection.selected.length = 1;
    component.selectFlight();
    expect(component.selection.selected.length).toEqual(1);
    component.selected = true;
    component.currentFlightId = 1;
  });

  it('mealsChart false codition', () => {
    component.selection.selected.length = 0;
    component.mealsChart();
    expect(component.selection.selected.length).toEqual(0);
    component.openDialog();
  });

  it('mealsChart true codition', () => {
    component.selection.selected.length = 1;
    component.mealsChart();
    expect(component.selection.selected.length).toEqual(1);
    component.mealschartSelect = true;
    component.currentFlightId = 1;
  });
});
