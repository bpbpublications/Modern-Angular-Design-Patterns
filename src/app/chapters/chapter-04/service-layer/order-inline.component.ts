// ============================================================================
// REFERENCE FILE ONLY: Business Logic Placed Directly In The Component
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The running demo instead uses service-layer/order.component.ts, which
// delegates HTTP calls to OrderService.
// ============================================================================
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './order';

@Component({ selector: 'app-order-inline', template: '' })
export class OrderComponent {
  private http = inject(HttpClient);

  placeOrder(order: Order) {
    return this.http.post('/api/orders', order);
  }
}
