// cart.facade.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addItem, removeItem } from '../actions/cart.actions';
import { selectCartItems, selectCartItemCount } from '../selectors/cart.selectors';
@Injectable({ providedIn: 'root' })
export class CartFacade {
  readonly cartItems$: Observable<{ name: string; price: number }[]>;
  readonly totalItems$: Observable<number>;

  constructor(private store: Store) {
    this.cartItems$ = store.select(selectCartItems);
    this.totalItems$ = store.select(selectCartItemCount);
  }

  addItem(item: { name: string; price: number }) {
    this.store.dispatch(addItem({ item }));
  }
  removeItem(itemId: number) {
    this.store.dispatch(removeItem({ itemId }));
  }
}
