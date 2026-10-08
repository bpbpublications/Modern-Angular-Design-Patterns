// ============================================================================
// REFERENCE FILE ONLY: Overriding PRODUCT_API In A Feature Route
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// These routes are not mounted in the demo app; the demo hosts DemoPage with
// the same useValue provider instead.
// ============================================================================
import { Routes } from '@angular/router';
import { PRODUCT_API } from './tokens';

const routes: Routes = [
  {
    path: 'demo',
    loadComponent: () => import('./demo.page').then(m => m.DemoPage),
    providers: [
      {
        provide: PRODUCT_API,
        useValue: { getProduct: async () => ({ id: '1', name: 'Demo Product' }) }
      }
    ]
  }
];
