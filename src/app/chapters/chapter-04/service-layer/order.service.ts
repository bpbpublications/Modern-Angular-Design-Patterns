import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);

  placeOrder(order: Order): Observable<any> {
    // Demo stub — replace with HttpClient call for real API usage.
    // return this.http.post('/api/orders', order);
    console.log('placeOrder', order);
    return of({ success: true });
  }

  cancelOrder(id: string): Observable<any> {
    // Demo stub — replace with HttpClient call for real API usage.
    // return this.http.delete(`/api/orders/${id}`);
    console.log('cancelOrder', id);
    return of({ success: true });
  }
}
