import { Routes } from '@angular/router';

export const BETA_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./beta.page').then(m => m.BetaPage) },
];
