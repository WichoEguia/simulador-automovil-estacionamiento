import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  addAuto() {
    return this.http.post(`${this.url}/addAuto`, {});
  }

  getAutos() {
    return this.http.get(`${this.url}/getAutos`);
  }

  getEstacionamiento() {
    return this.http.get(`${this.url}/getEstacionamiento`);
  }
}
