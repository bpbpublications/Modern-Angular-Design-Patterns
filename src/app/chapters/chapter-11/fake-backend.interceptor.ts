// ============================================================================
// GLUE FILE: Fake Backend Interceptor For Chapter 11
// ============================================================================
// This file is NOT book code. The book's Chapter 11 snippets call relative
// URLs ('/api/users', '/api/users/:id', '/api/products') that have no real
// server behind them in this demo app. This interceptor fabricates realistic
// responses for those URLs so the book code can run unmodified. It also
// serves '/api/demo/fail-<status>' endpoints used by the demo hosts to
// trigger the book's centralized error handling. Registered via
// CHAPTER_11_ROUTES.
// ============================================================================
import { HttpInterceptorFn } from '@angular/common/http';
import { fakeHttpFail, fakeHttpOk } from '../../shared/fake-http';
import { UserApi } from './model-adapter/api/user.api';
import { ProductApi } from './transforming-responses/api/product.api';

const users: UserApi[] = [
  { user_id: 123, user_name: 'Jane Doe', account_created: '2026-01-01T12:00:00Z' },
  { user_id: 124, user_name: 'John Smith', account_created: '2026-03-18T09:15:00Z' },
  { user_id: 125, user_name: 'Ada Lovelace', account_created: '2026-06-02T17:45:00Z' },
];

const product: ProductApi = {
  product_id: 'p-123',
  product_name: 'Wireless Mouse',
  price_usd: '29.99',
  created_at: '2026-01-15T08:30:00.000Z',
};

export const chapter11FakeBackendInterceptor: HttpInterceptorFn = (req, next) => {
  const ok = <T>(body: T, status = 200) => fakeHttpOk<T>(req.url, body, { status });
  const fail = (status: number, statusText: string) => fakeHttpFail(req.url, status, statusText);

  if (req.url === '/api/users' && req.method === 'GET') {
    return ok<UserApi[]>(users);
  }

  const userMatch = req.url.match(/^\/api\/users\/(\d+)$/);
  if (userMatch && req.method === 'GET') {
    const found = users.find((u) => u.user_id === Number(userMatch[1]));
    return found ? ok<UserApi>(found) : fail(404, 'Not Found');
  }

  if (req.url === '/api/users' && req.method === 'POST') {
    // Echo the payload back, as a real API typically would on create.
    return ok(req.body, 201);
  }

  if (req.url === '/api/products' && req.method === 'GET') {
    return ok<ProductApi>(product);
  }

  const failMatch = req.url.match(/^\/api\/demo\/fail-(\d+)$/);
  if (failMatch) {
    const status = Number(failMatch[1]);
    return fail(status, status === 0 ? 'Unknown Error' : `Fabricated ${status}`);
  }

  return next(req);
};
