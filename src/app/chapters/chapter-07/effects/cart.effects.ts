// effects/cart.effects.ts
// Implementing an effect for fetching items from an API
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CartService } from '../services/cart.service';
import { addItem, addItemOk, addItemErr } from '../actions/cart.actions';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private cartService = inject(CartService);
  
  loadCartItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addItem),
      mergeMap(({ item }) =>
        this.cartService.addItemToCart(item).pipe(
          map(() => addItemOk({ item })),
          catchError(() => of(addItemErr()))
        )
      )
    )
  );
}
