import { Component, inject } from '@angular/core';
import { OrderService } from './order.service';
@Component({
  standalone: true,
  selector: 'app-order',
  template: `<button (click)="order()">Place Order</button>`
})
export class OrderComponent {
  private orderService = inject(OrderService);

  order() {
    this.orderService.placeOrder();
  }
}
