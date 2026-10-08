// ============================================================================
// REFERENCE FILE ONLY: Overview Of Router Guards
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// It holds the five route literals shown in the book (CanActivate,
// CanDeactivate, typed resolver registration, inline resolver, CanMatch), kept
// verbatim but each wrapped in an exported const so the file compiles (the
// book shows bare route literals). The guards redirect to the absolute
// '/login' path that exists at the root of the book's standalone app, not of
// this demo app. The navigable equivalents — the same guards with
// demo-prefixed redirect targets — are mounted by ../router-demo.routes.ts.
// The admin.routes import path points at ../complex-routing/admin.routes where
// the book's admin.routes.ts lives vs. the chapter's example './admin.routes'.
// ============================================================================
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { EditProfileComponent } from './edit-profile.component';
import { userResolver } from './user.resolver';
import { UserService } from './user.service';

// Protecting routes before access with CanActivate
export const canActivateExample: Route =
{
  path: 'dashboard',
  loadComponent: () => import('./dashboard.page').then(m => m.DashboardPage),
  canActivate: [() =>
    inject(AuthService).isLoggedIn() || inject(Router).createUrlTree(['/login'])
  ]
};

// Preventing accidental navigation away with CanDeactivate
export const canDeactivateExample: Route =
{
  path: 'edit/:id',
  component: EditProfileComponent,
  canDeactivate: [
    (component: EditProfileComponent) =>
      component.hasUnsavedChanges()
        ? confirm('You have unsaved changes. Leave this page?')
        : true
  ]
};

// routes.ts — registering the typed userResolver
export const typedResolverExample: Route =
{
  path: 'user/:id',
  loadComponent: () => import('./user.page').then(m => m.UserPage),
  resolve: { user: userResolver }
};

// Inline functional resolver "for simple, route-specific prefetching".
export const inlineResolverExample: Route =
{
  path: 'user/:id',
  loadComponent: () => import('./user.page').then(m => m.UserPage),
  resolve: {
    user: (route: ActivatedRouteSnapshot) => inject(UserService).getUserById(route.paramMap.get('id')!)
  }
};

// Restricting lazy-loaded features with CanMatch
export const canMatchExample: Route =
{
  path: 'admin',
  loadChildren: () => import('../complex-routing/admin.routes').then(m => m.ADMIN_ROUTES),
  canMatch: [() => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.hasRole('admin') || router.createUrlTree(['/login']);
  }]
};
