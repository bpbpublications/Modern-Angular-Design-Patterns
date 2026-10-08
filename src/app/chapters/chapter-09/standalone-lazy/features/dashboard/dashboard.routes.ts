import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./dashboard.component').then(m =>
m.DashboardComponent) },
  { path: 'users', loadComponent: () => import('./dashboard/dashboard-users.component').then(m => m.DashboardUsersComponent) }
];
