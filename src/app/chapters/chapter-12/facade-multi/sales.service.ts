// Emits fabricated revenue after a short delay.
import { Injectable } from '@angular/core';
import { Observable, defer, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SalesService {
  getRevenue(): Observable<number> {
    return defer(() => of(50000 + Math.floor(Math.random() * 20000))).pipe(delay(500));
  }
}
