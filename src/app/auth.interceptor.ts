import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ambil token otentikasi dari localStorage atau dari tempat penyimpanan lainnya
    const authToken = 'Bearer ' + localStorage.getItem('authToken');

    // Salin permintaan dan tambahkan header Authorization dengan token
    const authRequest = request.clone({
      headers: request.headers.set('Authorization', authToken)
    });

    // Lanjutkan dengan permintaan yang telah dimodifikasi
    return next.handle(authRequest);
  }
}
