import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./admin.page').then(m => m.AdminPage) },
  { path: 'users', loadComponent: () => import('./manage-users.page').then(
    m => m.ManageUsersPage)
  },
];
