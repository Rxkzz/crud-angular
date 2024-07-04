// src/app/user-auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private baseUrl: string = 'https://api.example.com'; // Ganti dengan base URL dari Swagger API Anda

  constructor(private http: HttpClient) {}

  login(payload: any) {
    const url = `${this.baseUrl}/auth/login`; // Sesuaikan dengan endpoint login dari Swagger API
    return this.http.post(url, payload).toPromise();
  }

  register(payload: any) {
    const url = `${this.baseUrl}/auth/register`; // Sesuaikan dengan endpoint register dari Swagger API
    return this.http.post(url, payload).toPromise();
  }

  // Tambahan fungsi lainnya sesuai kebutuhan aplikasi Anda
}
