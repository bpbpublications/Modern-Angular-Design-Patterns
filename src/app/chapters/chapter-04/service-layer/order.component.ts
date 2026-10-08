import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from './order.service';
import { Order } from './order';

@Component({
  standalone: true,
  selector: 'app-order',
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="submit(order)">
      <label for="product">Product:</label>
      <input id="product" [(ngModel)]="order.product" name="product" required />

      <label for="quantity">Quantity:</label>
      <input id="quantity" type="number" [(ngModel)]="order.quantity" name="quantity" required />

      <button type="submit">Place Order</button>
    </form>
  `
})
export class OrderComponent {
    order: Order = { product: '', quantity: 0 };
    private orderService = inject(OrderService);

    submit(order: Order) {
        this.orderService.placeOrder(order).subscribe({
            next: () => alert('Order placed successfully!'),
            error: (err) => alert('Failed to place order: ' + err.message)
        });
    }
}
