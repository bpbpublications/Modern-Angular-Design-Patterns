// ============================================================================
// REFERENCE FILE ONLY: Putting It All Together (Complete Route Configuration)
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The actual application bootstraps from src/main.ts. This snippet shows a
// complete route configuration with a default redirect, a dynamic parameter,
// nested child routes and a wildcard fallback, bootstrapped with
// withInMemoryScrolling.
// ============================================================================
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, withInMemoryScrolling } from '@angular/router';
import { AppComponent } from './app/app.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home.page').then(
    m => m.HomePage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings.page').then(m => m.SettingsPage),
    children: [
      { path: 'profile/:id', loadComponent: () => import('./profile.page').then(
        m => m.ProfilePage)
      }
    ]
  },
  // 404 fallback (must be last)
  {
    path: '**',
    loadComponent: () => import('./app/not-found.component').then(m =>
m.NotFoundComponent),
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withInMemoryScrolling(
      { scrollPositionRestoration: 'enabled' }))
  ]
});
