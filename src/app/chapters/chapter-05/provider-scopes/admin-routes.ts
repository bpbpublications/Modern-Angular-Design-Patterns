// ============================================================================
// REFERENCE FILE ONLY: Route-Level Provider Example
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// These routes are not mounted in the demo app; the demo hosts AdminPage with
// the same providers instead.
// ============================================================================
import { Routes } from '@angular/router';
import { ADMIN_API, AdminHttpService } from './admin-api';

const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin.page').then(m => m.AdminPage),
    providers: [
      { provide: ADMIN_API, useClass: AdminHttpService }
    ]
  }
];
