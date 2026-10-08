// actions/cart.actions.ts
import { createAction, props } from '@ngrx/store';
// Action to add an item to the cart
export const addItem = createAction('[Cart] Add Item',
  props<{ item: { name: string; price: number }}>());
// Success action creator result
export const addItemOk  = createAction('[Cart API] Add Item Success',
  props<{ item: { name: string; price: number }}>());
// Failure action creator result
export const addItemErr = createAction('[Cart API] Add Item Failure');
// Action to remove an item from the cart
export const removeItem = createAction('[Cart] Remove Item',
  props<{ itemId: number }>());
