import { catchError, finalize, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
    data: any;
    isLoading = false;

    constructor(private http: HttpClient) { }

    updateData(): void {
      this.isLoading = true;

      this.http.get('/api/data')
        .pipe(
          finalize(() => this.isLoading = false),
          catchError(err => of([]))
        )
        .subscribe(data => {
          this.data = data;
        });
    }
}
