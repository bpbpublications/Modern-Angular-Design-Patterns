import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home-page').then((m) => m.HomePage),
  },
  {
    path: 'chapter-01',
    loadComponent: () =>
      import('./chapters/chapter-01/chapter-01-page').then((m) => m.Chapter01Page),
  },
  {
    // Mounts the book's lazy-loading routes snippet (Chapter 1) for real.
    path: 'chapter-01/lazy-demo',
    loadChildren: () => import('./chapters/chapter-01/lazy/routes').then((m) => m.routes),
  },
  {
    path: 'chapter-02',
    loadComponent: () =>
      import('./chapters/chapter-02/chapter-02-page').then((m) => m.Chapter02Page),
  },
  {
    path: 'chapter-03',
    loadComponent: () =>
      import('./chapters/chapter-03/chapter-03-page').then((m) => m.Chapter03Page),
  },
  {
    path: 'chapter-04',
    loadComponent: () =>
      import('./chapters/chapter-04/chapter-04-page').then((m) => m.Chapter04Page),
  },
  {
    path: 'chapter-05',
    loadComponent: () =>
      import('./chapters/chapter-05/chapter-05-page').then((m) => m.Chapter05Page),
  },
  {
    // Chapter 6 needs a route-level fake backend interceptor for its HTTP demos.
    path: 'chapter-06',
    loadChildren: () =>
      import('./chapters/chapter-06/chapter-06.routes').then((m) => m.CHAPTER_06_ROUTES),
  },
  {
    // Chapter 7 needs route-level NgRx providers (store, devtools, effects).
    path: 'chapter-07',
    loadChildren: () =>
      import('./chapters/chapter-07/chapter-07.routes').then((m) => m.CHAPTER_07_ROUTES),
  },
  {
    path: 'chapter-08',
    loadComponent: () =>
      import('./chapters/chapter-08/chapter-08-page').then((m) => m.Chapter08Page),
  },
  {
    // Mounts the Chapter 8 routing demos (guards, resolvers, nested/aux routes).
    path: 'chapter-08/router-demo',
    loadChildren: () =>
      import('./chapters/chapter-08/router-demo.routes').then((m) => m.ROUTER_DEMO_ROUTES),
  },
  {
    path: 'chapter-09',
    loadComponent: () =>
      import('./chapters/chapter-09/chapter-09-page').then((m) => m.Chapter09Page),
  },
  {
    // Mounts the Chapter 9 lazy-loading demos (preloading, feature flags).
    path: 'chapter-09/lazy-demo',
    loadChildren: () =>
      import('./chapters/chapter-09/lazy-demo.routes').then((m) => m.LAZY_DEMO_ROUTES),
  },
  {
    path: 'chapter-10',
    loadComponent: () =>
      import('./chapters/chapter-10/chapter-10-page').then((m) => m.Chapter10Page),
  },
  {
    // Chapter 11 needs a route-level fake backend interceptor and httpErrorInterceptor.
    path: 'chapter-11',
    loadChildren: () =>
      import('./chapters/chapter-11/chapter-11.routes').then((m) => m.CHAPTER_11_ROUTES),
  },
  {
    path: 'chapter-12',
    loadComponent: () =>
      import('./chapters/chapter-12/chapter-12-page').then((m) => m.Chapter12Page),
  },
  {
    path: 'chapter-13',
    loadComponent: () =>
      import('./chapters/chapter-13/chapter-13-page').then((m) => m.Chapter13Page),
  },
  {
    // Chapter 14 needs route-level providers (NgRx store/effects, interceptors, LOGGER).
    path: 'chapter-14',
    loadChildren: () =>
      import('./chapters/chapter-14/chapter-14.routes').then((m) => m.CHAPTER_14_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
