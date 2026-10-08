import { createReducer, on } from '@ngrx/store';
import { Product } from './product.model';
import {
  loadProductById,
  loadProductByIdSuccess,
  loadProducts,
  loadProductsSuccess,
} from './product.actions';

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
};

export const productReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({ ...state, loading: true })),
  on(loadProductsSuccess, (state, { products }) => ({ ...state, products, loading: false })),
  on(loadProductById, (state) => ({ ...state, loading: true })),
  on(loadProductByIdSuccess, (state, { product }) => ({
    ...state,
    selectedProduct: product,
    loading: false,
  }))
);
