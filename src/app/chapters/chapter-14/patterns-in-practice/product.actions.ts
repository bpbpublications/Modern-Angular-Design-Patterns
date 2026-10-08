import { createAction, props } from '@ngrx/store';
import { Product } from './product.model';

export const loadProducts = createAction('[Product] Load Products');

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductById = createAction(
  '[Product] Load Product By Id',
  props<{ id: string }>()
);

export const loadProductByIdSuccess = createAction(
  '[Product] Load Product By Id Success',
  props<{ product: Product | null }>()
);
