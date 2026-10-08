// ============================================================================
// GLUE FILE: Chapter 07 Route Wiring
// ============================================================================
// This file is NOT book code. EnvironmentProviders cannot go in component
// providers, so the chapter's NgRx slice is registered at route level. The
// book's main.ts setup snippet (provideStore + provideStoreDevtools) is kept
// verbatim in store-setup/main.ts; here the root store lives in app.config.ts
// and this lazy route contributes its 'cart' slice via provideState —
// registering a second root store in a lazy injector makes NgRx's root-scoped
// EffectsRunner fail with a circular-dependency error.
// The parent app should load this via:
//   { path: 'chapter-07', loadChildren: () =>
//       import('./chapters/chapter-07/chapter-07.routes').then((m) => m.CHAPTER_07_ROUTES) }
// ============================================================================
import { isDevMode } from '@angular/core';
import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { Chapter07Page } from './chapter-07-page';
import { cartReducer } from './reducers/cart.reducer';
import { CartEffects } from './effects/cart.effects';

export const CHAPTER_07_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideState('cart', cartReducer),
      provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
      provideEffects([CartEffects]),
    ],
    component: Chapter07Page,
  },
];
