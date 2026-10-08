// Emits fabricated metrics after a short delay.
import { Injectable } from '@angular/core';
import { Observable, defer, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  getVisits(): Observable<number> {
    return defer(() => of(12000 + Math.floor(Math.random() * 4000))).pipe(delay(400));
  }

  getConversions(): Observable<number> {
    return defer(() => of(300 + Math.floor(Math.random() * 150))).pipe(delay(650));
  }
}
