import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from 'src/app/common-modules/shared/interfaces/admin';
import { AncillaryService } from 'src/app/common-modules/shared/interfaces/ancillary-service';
import { Flight } from 'src/app/common-modules/shared/interfaces/flight';
import { InflightshopService } from 'src/app/common-modules/shared/interfaces/inflightshop-service';
import { Passenger } from 'src/app/common-modules/shared/interfaces/passenger';
import { SpecialMeal } from 'src/app/common-modules/shared/interfaces/special-meal';

@Injectable({
  providedIn: 'root',
})
export class HttpApiService {
  private baseURL: string;
  public currentFid: number;
  public fId: number;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.baseURL = 'http://localhost:3000';
  }

  public getFlights(): Observable<Flight[]> {
    return this.httpClient.get<Flight[]>(this.baseURL + '/flights');
  }
  public setCurrentFlight(id: number): void {
    this.currentFid = id;
  }

  public getAllPassengers(): Observable<Passenger[]> {
    return this.httpClient.get<Passenger[]>(this.baseURL + '/passengers');
  }

  public getPassengersByFlight(flightId: number): Observable<Passenger[]> {
    return this.httpClient.get<Passenger[]>(
      this.baseURL + '/passengers?fid=' + flightId
    );
  }

  public authAdmin(admin: Admin): Observable<Admin> {
    return this.httpClient.get<Admin>(
      this.baseURL +
        '/admin?userName=' +
        admin.userName +
        '&password=' +
        admin.password
    );
  }

  public getAncillaryServiceByFid(fid: number): Observable<AncillaryService> {
    return this.httpClient.get<AncillaryService>(
      this.baseURL + '/ancillaryservices?fid=' + fid
    );
  }

  public getInflightShopServiceByFid(
    fid: number
  ): Observable<InflightshopService> {
    return this.httpClient.get<InflightshopService>(
      this.baseURL + '/inflightshopservices?fid=' + fid
    );
  }

  public getSpecialMealByFid(fid: number): Observable<SpecialMeal> {
    return this.httpClient.get<SpecialMeal>(
      this.baseURL + '/specialmeal?fid=' + fid
    );
  }

  public addAncillaryService(
    serviceId: number,
    service: AncillaryService
  ): Observable<AncillaryService> {
    return this.httpClient.put<AncillaryService>(
      this.baseURL + '/ancillaryservices/' + serviceId,
      service
    );
  }

  public addInflightShopService(
    serviceId: number,
    service: InflightshopService
  ): Observable<InflightshopService> {
    return this.httpClient.put<InflightshopService>(
      this.baseURL + '/inflightshopservices/' + serviceId,
      service
    );
  }

  public addSpecialMeal(
    serviceId: number,
    specialmeal: SpecialMeal
  ): Observable<SpecialMeal> {
    return this.httpClient.put<SpecialMeal>(
      this.baseURL + '/specialmeal/' + serviceId,
      specialmeal
    );
  }

  public updatePassengerDetails(passenger: Passenger): Observable<Passenger> {
    return this.httpClient.put<Passenger>(
      this.baseURL + '/passengers/' + passenger.id,
      passenger
    );
  }

  public updatePassenngerSeat(passenger: Passenger): Observable<Passenger> {
    return this.httpClient.put<Passenger>(
      this.baseURL + '/passengers/' + passenger.id,
      passenger
    );
  }

  public addPassenger(passenger: Passenger): Observable<any> {
    return this.httpClient.post<Passenger>(
      this.baseURL + '/passengers',
      passenger
    );
  }
}
