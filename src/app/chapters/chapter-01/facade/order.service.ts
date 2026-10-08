import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OrderService {
  getOrdersByUserId(userId: number): Observable<{ id: number; item: string; userId: number }[]> {
    return of([
      { id: 1, item: 'Angular Handbook', userId: 1 },
      { id: 2, item: 'RxJS Cookbook', userId: 2 },
    ].filter(order => order.userId === userId)).pipe(delay(300));
  }
}
