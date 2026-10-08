// ============================================================================
// GLUE FILE: Chapter 14 Route Wiring
// ============================================================================
// This file is NOT book code. provideStore/provideEffects/provideHttpClient
// are EnvironmentProviders, so they cannot live in component providers — they
// are registered here at route level instead.
// The parent app should load this via:
//   { path: 'chapter-14', loadChildren: () =>
//       import('./chapters/chapter-14/chapter-14.routes').then((m) => m.CHAPTER_14_ROUTES) }
// ============================================================================
import { Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { Chapter14Page } from './chapter-14-page';
import { errorNormalizingInterceptor } from './error-handling/error-normalizing.interceptor';
import { fakeBackendInterceptor } from './fake-backend.interceptor';
import { employeeReducer } from './enterprise-app/employee.reducer';
import { EmployeeEffects } from './enterprise-app/employee.effects';
import { EmployeeFacade } from './enterprise-app/employee.facade';
import { productReducer } from './patterns-in-practice/product.reducer';
import { ProductEffects } from './patterns-in-practice/product.effects';
import { ProductFacade } from './patterns-in-practice/product.facade';
import { sessionReducer } from './patterns-in-practice/session.state';
import { UserApiService } from './testing-strategies/user-api.service';
import { GlobalAppErrorHandler, LOGGER, Logger } from './error-handling/global-app-error-handler';

// Supporting ConsoleLogger: the book's GlobalAppErrorHandler snippet says
// "Provide LOGGER at bootstrap" but never defines a Logger implementation.
// This one forwards structured events to console.error so the chapter's
// ConsolePanel mirrors them on screen.
class ConsoleLogger implements Logger {
  error(event: string, payload: Record<string, unknown>): void {
    console.error(`[LOGGER] ${event}`, payload);
  }
}

export const CHAPTER_14_ROUTES: Routes = [
  {
    path: '',
    providers: [
      // Book's error-normalizing interceptor first, then the supporting fake
      // backend, so fabricated failures flow back through the normalizer.
      provideHttpClient(withInterceptors([errorNormalizingInterceptor, fakeBackendInterceptor])),
      // The root store is registered once in app.config.ts; this lazy route
      // contributes its slices via provideState — a second provideStore() in a
      // lazy injector breaks NgRx's root-scoped EffectsRunner (circular DI).
      provideState('employee', employeeReducer),
      provideState('products', productReducer),
      provideState('session', sessionReducer),
      provideEffects([EmployeeEffects, ProductEffects]),
      { provide: LOGGER, useClass: ConsoleLogger },
      // Route-level re-provision: these services are declared
      // providedIn: 'root' in the book snippets, but their dependencies (Store,
      // LOGGER) only exist in this route's environment injector, so they must
      // be instantiated here rather than in the root injector.
      EmployeeFacade,
      ProductFacade,
      GlobalAppErrorHandler,
      // UserApiService has no providedIn — the book's spec provides it in the
      // TestBed; the demo provides it here.
      UserApiService,
    ],
    component: Chapter14Page,
  },
];
