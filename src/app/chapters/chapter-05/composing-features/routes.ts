// ============================================================================
// REFERENCE FILE ONLY: Routing Directly To A Standalone Component With loadComponent
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// These routes are not mounted in the demo app; the demo renders ProductPage
// directly instead.
// ============================================================================
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'product',
    loadComponent: () => import('./product.page').then(m => m.ProductPage)
  }
];
