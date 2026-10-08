// ============================================================================
// REFERENCE FILE ONLY: Feature Based Routing (App-Level Registration)
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The real application wires the demo routes through src/app/app.routes.ts, and
// the demo mounts ADMIN_ROUTES via router-demo.routes.ts.
// ============================================================================
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: 'admin', loadChildren: () => import('./admin.routes').then(m =>
m.ADMIN_ROUTES)}
];
