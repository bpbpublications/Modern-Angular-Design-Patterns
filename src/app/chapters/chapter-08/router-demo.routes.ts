// ============================================================================
// GLUE FILE: Mounting Chapter 8's Routing Snippets
// ============================================================================
// This file is NOT book code. It mounts the book's Chapter 8 routing snippets
// for real. The parent app wires this file into app.routes.ts as:
//   {
//     path: 'chapter-08/router-demo',
//     loadChildren: () =>
//       import('./chapters/chapter-08/router-demo.routes').then(m => m.ROUTER_DEMO_ROUTES),
//   }
//
// Where a example route literal contains an absolute redirect that targets the
// root of the book's own standalone app ('/login'), the mounted copy below
// re-targets it to the demo's login page; the untouched originals live in
// router-guards/guards.routes.ts. Every such case is commented inline.
// ============================================================================
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Routes } from '@angular/router';
import { RouterDemoShellComponent, RouterDemoIndexComponent } from './router-demo-shell.component';
import { routes as simpleRoutes } from './understanding-routing/simple-routes';
import { routes as dynamicRoutes } from './dynamic-routes/dynamic.routes';
import { LiveUserParamComponent } from './dynamic-routes/live-user-param.component';
import { ParamSignalsComponent } from './dynamic-routes/param-signals.component';
import { SearchComponent } from './dynamic-routes/search.component';
import { AuthService } from './router-guards/auth.service';
import { EditProfileComponent } from './router-guards/edit-profile.component';
import { userResolver } from './router-guards/user.resolver';
import { UserService } from './router-guards/user.service';
import { routes as nestedRoutes } from './complex-routing/nested.routes';
import { auxRouteExample } from './complex-routing/aux-route.routes';
import { ReuseTabComponent } from './route-reuse/reuse-tab.component';

export const ROUTER_DEMO_ROUTES: Routes = [
  {
    path: '',
    component: RouterDemoShellComponent,
    children: [
      { path: '', pathMatch: 'full', component: RouterDemoIndexComponent },

      // "Example of a simple route definition" — mounted under 'basic'. Note:
      // the book array's empty-path entry redirects to the absolute '/home',
      // so only the /basic/home and /basic/about links are used by the demo.
      { path: 'basic', children: simpleRoutes },

      // "Defining a dynamic route" — mounted under 'dynamic'.
      { path: 'dynamic', children: dynamicRoutes },

      // Host route for the long-lived paramMap subscription demo. ':id' is a
      // child route so the component's relative links ('../1') resolve to
      // sibling ids, mirroring the book's /user/1 → /user/2 scenario.
      { path: 'live-user', children: [{ path: ':id', component: LiveUserParamComponent }] },

      // Host route for the toSignal(route.paramMap/queryParamMap) snippet.
      { path: 'params/:id', component: ParamSignalsComponent },

      // Host route for the queryParamMap subscription snippet.
      { path: 'search', component: SearchComponent },

      // The redirect targets the demo login page instead of the example's root-level '/login'.
      {
        path: 'dashboard',
        loadComponent: () => import('./router-guards/dashboard.page').then(m => m.DashboardPage),
        canActivate: [() =>
          inject(AuthService).isLoggedIn() ||
          inject(Router).createUrlTree(['/chapter-08/router-demo/login'])
        ]
      },

      // The login page the guards redirect to.
      { path: 'login', loadComponent: () => import('./router-guards/login.page').then(m => m.LoginPage) },

      // Book CanDeactivate guard route — verbatim.
      {
        path: 'edit/:id',
        component: EditProfileComponent,
        canDeactivate: [
          (component: EditProfileComponent) =>
            component.hasUnsavedChanges()
              ? confirm('You have unsaved changes. Leave this page?')
              : true
        ]
      },

      // Book typed functional resolver route — verbatim.
      {
        path: 'user/:id',
        loadComponent: () => import('./router-guards/user.page').then(m => m.UserPage),
        resolve: { user: userResolver }
      },

      // For demo path prefixed 'user-inline' because the typed variant above 
      // already owns 'user/:id' (in the book they are alternative declarations of the same route).
      {
        path: 'user-inline/:id',
        loadComponent: () => import('./router-guards/user.page').then(m => m.UserPage),
        resolve: {
          user: (route: ActivatedRouteSnapshot) => inject(UserService).getUserById(route.paramMap.get('id')!)
        }
      },

      // The redirect targets the demo login page instead of the example's root-level '/login'.
      {
        path: 'admin',
        loadChildren: () => import('./complex-routing/admin.routes').then(m => m.ADMIN_ROUTES),
        canMatch: [() => {
          const auth = inject(AuthService);
          const router = inject(Router);
          return auth.hasRole('admin') ||
            router.createUrlTree(['/chapter-08/router-demo/login']);
        }]
      },

      // "Nested routes aka child routes".
      ...nestedRoutes,

      // "Auxiliary routes, aka named outlets".
      auxRouteExample,

      // Custom RouteReuseStrategy — 'cached' opts in via data.reuse, 'uncached' doesn't.
      { path: 'reuse-demo/cached', component: ReuseTabComponent, data: { reuse: true, label: 'Cached tab' } },
      { path: 'reuse-demo/uncached', component: ReuseTabComponent, data: { label: 'Uncached tab' } },

      // A demo-scoped 404 so the wildcard behaviour described in
      // "Putting it all together" is observable (the book's own main.ts is
      // kept verbatim but never imported).
      {
        path: '**',
        loadComponent: () =>
          import('./route-configuration/app/not-found.component').then(m => m.NotFoundComponent),
      },
    ],
  },
];
