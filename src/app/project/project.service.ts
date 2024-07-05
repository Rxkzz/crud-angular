import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from './project';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://192.168.5.200:84/api';

  constructor(private http: HttpClient, private router: Router) {}

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Equipment`)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(data: any): Observable<any> {
    const authToken = 'Bearer ' + localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': authToken
    });

    return this.http.post<any>(`${this.apiUrl}/Equipment`, data, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  update(data: Project): Observable<any> {
    const authToken = 'Bearer ' + localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': authToken
    });

    return this.http.patch<any>(`${this.apiUrl}/Equipment/${data.id}`, data, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<any> {
    const authToken = 'Bearer ' + localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': authToken
    });

    return this.http.delete<any>(`${this.apiUrl}/Equipment/${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  show(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Equipment/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      console.error('Backend returned code 401, body was:', error.error);
      // Handle 401 errors, e.g., redirect to login page or prompt user to re-authenticate
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'Please login again.',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/login']); // Example: Redirect to login page
    } else {
      console.error('Something bad happened; please try again later.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something bad happened; please try again later.',
        showConfirmButton: false,
        timer: 1500
      });
    }
    return throwError('Something bad happened; please try again later.');
  }
}
