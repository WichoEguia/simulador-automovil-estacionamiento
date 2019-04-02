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

  ocuparCajonEstacionamiento(auto, cajon) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const params = JSON.stringify({ auto, cajon });

    return this.http.post(`${this.url}/ocuparCajonEstacionamiento`, params, { headers });
  }
}
