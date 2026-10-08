// Re-export: lets the main.ts snippet import
// './app/reducers/cart.reducer' verbatim while reusing the chapter's real reducer.
export { cartReducer } from '../../../reducers/cart.reducer';
export type { CartState } from '../../../reducers/cart.reducer';
