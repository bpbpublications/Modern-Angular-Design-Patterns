// ============================================================================
// REFERENCE FILE ONLY: Registering The Cart Feature Route-Scoped As A Lazy Loaded Feature
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// This page's live store wiring comes from chapter-07.routes.ts, which uses the
// app-level provideStore variant instead.
// ============================================================================
import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { cartReducer } from './reducers/cart.reducer';
import { CartEffects } from './effects/cart.effects';

export const routes: Routes = [
  {
    path: 'cart',
    loadComponent: () => import('./cart.page').then(m => m.CartPage),
    providers: [
      provideState({ name: 'cart', reducer: cartReducer }),
      provideEffects([CartEffects])
    ]
  }
];
