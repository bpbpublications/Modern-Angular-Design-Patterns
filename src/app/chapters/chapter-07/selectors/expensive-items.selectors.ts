import { createSelector } from '@ngrx/store';
import { selectCartItems } from './cart.selectors';
export const selectExpensiveItems = createSelector(
  selectCartItems,
  (items) => items.filter(item => item.price > 5000)
);
