import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map, of, switchMap } from 'rxjs';
import { Product } from './product.model';
import {
  loadProductById,
  loadProductByIdSuccess,
  loadProducts,
  loadProductsSuccess,
} from './product.actions';

const PRODUCT_CATALOG: Product[] = [
  { id: 'p-1', name: 'Ergonomic Keyboard', price: 89 },
  { id: 'p-2', name: 'Standing Desk', price: 549 },
  { id: 'p-3', name: 'Noise-Cancelling Headset', price: 199 },
];

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        of(PRODUCT_CATALOG).pipe(
          delay(500),
          map((products) => loadProductsSuccess({ products }))
        )
      )
    )
  );

  loadProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductById),
      switchMap(({ id }) =>
        of(PRODUCT_CATALOG.find((product) => product.id === id) ?? null).pipe(
          delay(300),
          map((product) => loadProductByIdSuccess({ product }))
        )
      )
    )
  );
}
