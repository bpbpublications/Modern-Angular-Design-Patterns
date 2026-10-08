import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable()
export class ConfigService {
    data: any;

    constructor(private http: HttpClient) { }

    updateData(): void {
        this.http.get('/api/data')
        .pipe(
            catchError(error => {
            console.error('Error occurred:', error);
            return of([]); // return fallback data
            })
        )
        .subscribe(data => {
            this.data = data;
        });
    }
}
