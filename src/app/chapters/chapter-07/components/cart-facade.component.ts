// Using the facade in components — the component talks only
// to CartFacade instead of the store.
import { Component } from '@angular/core';
import { CartFacade } from '../facades/cart.facade';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [AsyncPipe],
  template: `
    <h2>Shopping Cart</h2>
    <p>Total Items: {{ totalItems$ | async }}</p>
    <ul>
      @for (item of $any(cartItems$ | async); track $index) {
        <li>{{ item.name }} — \${{ item.price / 100 }}</li>
      }
    </ul>
    <button (click)="addItem()">Add Item with default price $4.95</button>
  `
})
export class CartComponent {
  readonly cartItems$: Observable<{ name: string; price: number }[]>;
  readonly totalItems$: Observable<number>;

  constructor(private cartFacade: CartFacade) {
    this.cartItems$ = this.cartFacade.cartItems$;
    this.totalItems$ = this.cartFacade.totalItems$;
  }

  addItem() {
    this.cartFacade.addItem({ name: 'New Product', price: 495});
  }
}
