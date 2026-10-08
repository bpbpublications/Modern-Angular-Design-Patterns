// ============================================================================
// GLUE FILE: Chapter 11 Route Wiring
// ============================================================================
// This file is NOT book code. It registers the book's httpErrorInterceptor
// (plus the supporting fake backend) via
// provideHttpClient(withInterceptors(...)) — an EnvironmentProviders value, so
// it must be provided at route level.
// The parent app should load this via:
//   { path: 'chapter-11', loadChildren: () =>
//       import('./chapters/chapter-11/chapter-11.routes').then((m) => m.CHAPTER_11_ROUTES) }
// ============================================================================
import { Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Chapter11Page } from './chapter-11-page';
import { httpErrorInterceptor } from './error-handling/shared/http-error.interceptor';
import { chapter11FakeBackendInterceptor } from './fake-backend.interceptor';

export const CHAPTER_11_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideHttpClient(
        withInterceptors([httpErrorInterceptor, chapter11FakeBackendInterceptor])
      ),
    ],
    component: Chapter11Page,
  },
];
