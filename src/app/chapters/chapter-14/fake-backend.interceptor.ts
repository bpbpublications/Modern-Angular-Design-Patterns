// ============================================================================
// GLUE FILE: Chapter 14 Fake Backend Interceptor
// ============================================================================
// This file is NOT book code. The chapter's snippets call relative API URLs
// (/api/employees/:id, /api/users/:id) that have no real server behind them.
// This interceptor fabricates realistic responses — and, for
// /api/errors/:status, fabricated failures so the book's error-normalizing
// interceptor has something to normalize. Registered route-level in
// chapter-14.routes.ts via provideHttpClient(withInterceptors(...)).
// ============================================================================
import { HttpInterceptorFn } from '@angular/common/http';
import { fakeHttpFail, fakeHttpOk } from '../../shared/fake-http';

const EMPLOYEES: Record<string, Record<string, unknown>> = {
  'e-1001': {
    emp_id: 'e-1001',
    full_name: 'Alice Johnson',
    job_title: 'HR Manager',
    start_date: '2019-03-18',
  },
  'e-1002': {
    emp_id: 'e-1002',
    full_name: 'Bob Smith',
    job_title: 'Software Engineer',
    start_date: '2021-07-01',
  },
  // Malformed legacy payload: missing fields + invalid date, so the book's
  // defensive EmployeeAdapter fallbacks are visible in the demo.
  'e-1003': {
    emp_id: 'e-1003',
    start_date: 'not-a-date',
  },
};

export const fakeBackendInterceptor: HttpInterceptorFn = (req, next) => {
  const respond = (body: unknown) => fakeHttpOk(req.url, body, { delayMs: 400 });
  const fail = (status: number, statusText: string, error?: unknown) =>
    fakeHttpFail(req.url, status, statusText, { delayMs: 400, error });

  if (req.url.startsWith('/api/employees/')) {
    const id = req.url.split('/').pop() ?? '';
    const employee = EMPLOYEES[id];
    return employee ? respond(employee) : fail(404, 'Not Found');
  }

  if (req.url.startsWith('/api/users/')) {
    return respond({ id: req.url.split('/').pop(), full_name: 'Alice' });
  }

  if (req.url.startsWith('/api/errors/')) {
    const status = Number(req.url.split('/').pop());
    return fail(status, 'Fabricated Error', { reason: 'fabricated failure for the demo' });
  }

  return next(req);
};
