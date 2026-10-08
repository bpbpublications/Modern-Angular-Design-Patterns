import { Route } from '@angular/router';

export const reportsRoute: Route =
{
  path: 'reports',
  loadChildren: () => import('./reports.routes').then(m => m.REPORTS_ROUTES),
  data: { preload: true }
};
