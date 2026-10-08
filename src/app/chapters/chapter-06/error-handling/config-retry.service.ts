import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, retry } from 'rxjs';

@Injectable()
export class ConfigService {
    data: any;

    constructor(private http: HttpClient) { }

    updateData(): void {
    this.http.get('/api/data')
    .pipe(
        retry(3), // will try 3 additional times on failure
        catchError(err => of([]))
    )
    .subscribe(data => console.log(data));
    }
}
