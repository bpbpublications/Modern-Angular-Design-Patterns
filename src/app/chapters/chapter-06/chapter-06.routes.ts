// ============================================================================
// GLUE FILE: Chapter 06 Route Wiring
// ============================================================================
// This file is NOT book code. It registers the supporting fake backend via
// provideHttpClient(withInterceptors(...)) — an EnvironmentProviders value, so
// it must be provided at route level (it cannot go in component providers).
// The parent app should load this via:
//   { path: 'chapter-06', loadChildren: () =>
//       import('./chapters/chapter-06/chapter-06.routes').then((m) => m.CHAPTER_06_ROUTES) }
// ============================================================================
import { Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Chapter06Page } from './chapter-06-page';
import { chapter06FakeBackendInterceptor } from './fake-backend.interceptor';

export const CHAPTER_06_ROUTES: Routes = [
  {
    path: '',
    providers: [provideHttpClient(withInterceptors([chapter06FakeBackendInterceptor]))],
    component: Chapter06Page,
  },
];
