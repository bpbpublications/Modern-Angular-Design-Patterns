// ============================================================================
// REFERENCE FILE ONLY: Registering The Effect As A Provider In main.ts
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The real application bootstraps from src/main.ts, and this page's live store
// wiring comes from chapter-07.routes.ts. The './app/...' imports resolve to
// supporting glue files in ./app that re-export the chapter's real book code.
// ============================================================================
import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { cartReducer } from './app/reducers/cart.reducer';
import { CartEffects } from './app/effects/cart.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ cart: cartReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([CartEffects])
  ]
});
