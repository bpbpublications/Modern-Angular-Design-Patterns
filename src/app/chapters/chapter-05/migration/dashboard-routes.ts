// ============================================================================
// REFERENCE FILE ONLY: Replacing Lazy-Loaded Feature Modules With loadComponent
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// These routes are not mounted in the demo app.
// ============================================================================
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  }
];
