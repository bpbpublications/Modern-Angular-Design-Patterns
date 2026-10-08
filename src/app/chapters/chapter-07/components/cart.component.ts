// Using selectors in components
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartItems, selectCartItemCount } from '../selectors/cart.selectors';
@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule],
  template: `
    <h2>Shopping Cart</h2>
    <p>Total Items: {{ totalItems$ | async }}</p>
    <ul>
      @for (item of $any(cartItems$ | async); track $index) {
        <li>{{ item.name }} — \${{ item.price / 100 }}</li>
      }
    </ul>
  `
})
export class CartComponent {
  readonly cartItems$: Observable<{ name: string; price: number }[]>;
  readonly totalItems$: Observable<number>;

  constructor(store: Store) {
    this.cartItems$ = store.select(selectCartItems);
    this.totalItems$ = store.select(selectCartItemCount);
  }
}
