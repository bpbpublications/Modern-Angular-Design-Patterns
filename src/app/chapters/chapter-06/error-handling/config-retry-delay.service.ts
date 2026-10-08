import { catchError, of, retry } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
    data: any;
    private http = inject(HttpClient);

    updateData(): void {
        this.http.get('/api/data')
        .pipe(
          retry({ count: 3, delay: 1000 }), // retry 3 times, waiting 1 second between attempts
          catchError(err => of([]))
        )
        .subscribe(data => console.log(data));
    }
}
