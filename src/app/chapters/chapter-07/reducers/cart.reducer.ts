// reducers/cart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addItem, removeItem } from '../actions/cart.actions';

// Define the initial state
export interface CartState {
  items: { name: string; price: number }[];
}
const initialState: CartState = { items: [] };

// Create the reducer function
export const cartReducer = createReducer(
  initialState,
  on(addItem, (state, { item }) => ({
    ...state, items: [...state.items, item]
  })),
  on(removeItem, (state, { itemId }) => ({
    ...state, items: state.items.filter((_, index) => index !== itemId)
  }))
);
