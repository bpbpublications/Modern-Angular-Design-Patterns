// ============================================================================
// GLUE FILE: Mounting Chapter 9's Lazy-Loading Snippets
// ============================================================================
// This file is NOT book code. It mounts the book's Chapter 9 lazy-loading
// snippets for real. The parent app wires this file into app.routes.ts as:
//   {
//     path: 'chapter-09/lazy-demo',
//     loadChildren: () =>
//       import('./chapters/chapter-09/lazy-demo.routes').then(m => m.LAZY_DEMO_ROUTES),
//   }
// ============================================================================
import { Routes } from '@angular/router';
import { LazyDemoShellComponent, LazyDemoIndexComponent } from './lazy-demo-shell.component';
import { routes as lazyPatternRoutes } from './lazy-pattern/routes';
import { routes as dashboardFeatureRoutes } from './standalone-lazy/routes';
import { reportsRoute } from './preloading/preload-flagged.routes';
import { betaRoute } from './feature-flags/beta-flag.route';

export const LAZY_DEMO_ROUTES: Routes = [
  {
    path: '',
    component: LazyDemoShellComponent,
    children: [
      { path: '', pathMatch: 'full', component: LazyDemoIndexComponent },

      // "Key part of lazy loading in Angular" — the admin feature.
      ...lazyPatternRoutes,

      // "Verify route configuration" / "Set up feature routes file" — the
      // dashboard feature.
      ...dashboardFeatureRoutes,

      // "routes: flag routes you want preloaded" — the preload-flagged
      // reports feature (the data: { preload: true } metadata is inert here
      // because withPreloading(...) is bootstrap-level configuration).
      reportsRoute,

      // "Conditional feature loading in Angular" — the flag-gated beta
      // feature (verbatim, including the createUrlTree(['/']) redirect).
      betaRoute,
    ],
  },
];
