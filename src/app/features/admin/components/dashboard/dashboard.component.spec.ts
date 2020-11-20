import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectDialogComponent } from '../dialogs/select-dialog/select-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent, SelectDialogComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        MatDialogModule,
        BrowserAnimationsModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('goes back to flight list', () => {
    const selected = false;
    const ancillarySelect = false;
    const shopSelect = false;
    const specialMealSelect = false;
    component.backToFlight();
  });

  it('should open select dialog', () => {
    component.openDialog();
   });

  it('should open openSpecialMealService if-condition', () => {
    component.openSpecialMealService();
    component.selection.selected.length = 0;
    component.openDialog();
   });

  it('should open openSpecialMealService else-condition', () => {
    component.selection.selected.length = 1;
    component.specialMealSelect = true;
    component.currentFlightId = 1;
    component.openSpecialMealService();
   });

  it('should open openInflightShop if-condition', () => {
    component.openInflightShop();
    component.selection.selected.length = 0;
    component.openDialog();
   });

  it('should open openInflightShop else-condition', () => {
    component.selection.selected.length = 1;
    component.shopSelect = true;
    component.currentFlightId = 1;
    component.openInflightShop();
   });

  it('should open selectflight else-condition', () => {
    component.selection.selected.length = 1;
    component.selectFlight();
    expect(component.selection.selected.length).toEqual(1);
    component.selected = true;
    component.currentFlightId = 1;
   });

  it('should open openInflightShop else-condition', () => {
    component.specialMealSelect = true;
    component.currentFlightId = 4;
    component.openInflightShop();
   });

  it('should open openAncillary if-condition', () => {
    component.openAncillary();
    component.selection.selected.length = 0;
    component.openDialog();
   });

  it('should open openAncillary else-condition', () => {
    component.selection.selected.length = 1;
    component.ancillarySelect = true;
    component.currentFlightId = 1;
    component.openAncillary();
   });

  it('should open selectFlight if-condition', () => {
    component.selectFlight();
    component.selection.selected.length = 0;
    component.openDialog();
   });

});
