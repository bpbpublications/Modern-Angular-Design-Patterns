import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService<T> {
  private http = inject(HttpClient);

  get(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      catchError((err: HttpErrorResponse) =>
        throwError(() => new Error(`Request failed (${err.status})`))
      )
    );
  }
}
