import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = 'http://localhost:4200/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const loginData = { email, password };
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }

  register(email: string, password: string) {
    const registrationData = { email, password };
    return this.http.post(`${this.apiUrl}/register`, registrationData);
  }
}
