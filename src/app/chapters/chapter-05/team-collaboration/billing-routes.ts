// This route array is never mounted in the demo app's router — the demo
// renders BillingPage directly instead. It is imported by chapter-05-demos.ts
// only to read its route-level data (`owner: 'billing-team'`) for display.
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'billing',
    loadComponent: () => import('./billing.page').then(m => m.BillingPage),
    data: { owner: 'billing-team' }
  }
];
