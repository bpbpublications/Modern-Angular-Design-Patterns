// ============================================================================
// GLUE FILE: Fake Backend Interceptor For Chapter 6
// ============================================================================
// This file is glue that fabricates realistic responses
// for the book's Chapter 6 snippets, which call relative URLs
// ('/api/products', '/api/user', '/api/settings', '/api/data',
// '/api/search?q=...') with no real server behind them in this demo app.
// '/api/data' fails twice and then succeeds (repeating), so the real examples
// catchError/retry/retry with delay/finalize demos can show both outcomes. Every
// handled request is logged so retries are visible in the console panel.
// Registered via CHAPTER_06_ROUTES.
// ============================================================================
import { HttpInterceptorFn } from '@angular/common/http';
import { fakeHttpFail, fakeHttpOk } from '../../shared/fake-http';
import { Product } from './core-concepts/product';

const products: Product[] = [
  { id: 1, name: 'Angular Handbook' },
  { id: 2, name: 'RxJS Cookbook' },
  { id: 3, name: 'NgRx in Practice' },
];

const searchIndex = [
  'apple',
  'apricot',
  'banana',
  'blueberry',
  'cherry',
  'grape',
  'mango',
  'melon',
  'orange',
  'peach',
];

// '/api/data' fails on two consecutive attempts, then succeeds; the cycle repeats.
let dataAttempts = 0;

export const chapter06FakeBackendInterceptor: HttpInterceptorFn = (req, next) => {
  const ok = <T>(body: T, delayMs = 300) => fakeHttpOk<T>(req.url, body, { delayMs });
  const fail = (status: number, statusText: string, delayMs = 300) =>
    fakeHttpFail(req.url, status, statusText, { delayMs });

  if (req.url === '/api/products' && req.method === 'GET') {
    console.log('[fake backend] GET /api/products → 200');
    return ok<Product[]>(products);
  }

  if (req.url === '/api/user' && req.method === 'GET') {
    console.log('[fake backend] GET /api/user → 200 (after 800ms)');
    return ok({ id: 1, name: 'Jane Doe' }, 800);
  }

  if (req.url === '/api/settings' && req.method === 'GET') {
    console.log('[fake backend] GET /api/settings → 200');
    return ok({ theme: 'dark' });
  }

  if (req.url === '/api/data' && req.method === 'GET') {
    dataAttempts++;
    const succeed = dataAttempts % 3 === 0;
    console.log(
      `[fake backend] GET /api/data attempt ${dataAttempts} → ${succeed ? '200' : '500'}`
    );
    return succeed
      ? ok(['config-a', 'config-b'])
      : fail(500, 'Internal Server Error');
  }

  if (req.url.startsWith('/api/search') && req.method === 'GET') {
    const q = (req.url.split('?q=')[1] ?? '').toLowerCase();
    const results = searchIndex.filter((item) => item.includes(q));
    console.log(`[fake backend] GET /api/search?q=${q} → ${results.length} result(s)`);
    return ok<string[]>(results, 200);
  }

  return next(req);
};
