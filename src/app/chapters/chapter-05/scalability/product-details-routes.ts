// ============================================================================
// REFERENCE FILE ONLY: Maximizing Performance Through Lazy Loading
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// These routes are not mounted in the demo app; the demo renders
// ProductDetailsComponent directly instead.
// ============================================================================
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'product/:id',
    loadComponent: () => import('./product-details.component').then(m => m.ProductDetailsComponent)
  }
];
