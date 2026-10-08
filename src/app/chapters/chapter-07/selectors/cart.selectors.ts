// selectors/cart.selectors.ts
// Creating a simple selector
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from '../reducers/cart.reducer';
// Select the entire cart state
export const selectCartState = createFeatureSelector<CartState>('cart');
// Select only the list of items
export const selectCartItems = createSelector(selectCartState,
  (state) => state.items);
// Select the total number of items
export const selectCartItemCount = createSelector(selectCartItems, (items) => items.length);
