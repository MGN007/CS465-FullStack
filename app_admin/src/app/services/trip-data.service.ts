import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // GET all trips
  getTrips(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/trips`);
  }

  // GET single trip
  getTrip(tripCode: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/trips/${tripCode}`);
  }

  // ADD trip
  addTrip(trip: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/trips`, trip);
  }

  // UPDATE trip
  updateTrip(trip: any): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/trips/${trip.code}`, trip);
  }

  // DELETE trip
  deleteTrip(tripCode: string): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/trips/${tripCode}`);
  }

}