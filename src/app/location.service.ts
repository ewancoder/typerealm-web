import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LocationService {
  constructor(private http: HttpClient) { }

  // TODO: Type Location as return result.
  get(locationId: number): Observable<any> {
    return this.http.get(`http://localhost:30200/locations/${locationId}`);
  }
}
