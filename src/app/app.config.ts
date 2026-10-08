import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { CustomRouteReuseStrategy } from './chapters/chapter-08/route-reuse/custom-route-reuse.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Demo examples rely on zone-based change detection (plain property
    // assignment in async callbacks), so the demo app runs with zone.js.
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    // NgRx requires the root store to be registered once at the application
    // root (EffectsRunner/Store are root-scoped); the chapter routes register
    // their own slices with provideState()/provideEffects().
    provideStore(),
    // Chapter 8's custom RouteReuseStrategy demo. Safe to register app-wide:
    // shouldDetach/shouldAttach return false for any route without
    // data: { reuse: true }, and shouldReuseRoute matches Angular's own
    // DefaultRouteReuseStrategy exactly — so every route in every other
    // chapter behaves identically to the default, unchanged.
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
  ]
};
