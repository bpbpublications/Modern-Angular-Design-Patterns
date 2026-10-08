// error-normalizing.interceptor.ts (Angular 20 functional interceptor)
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

type AppError =
  | { kind: 'auth'; status: 401 | 403; message: string }
  | { kind: 'validation'; status: 400 | 422; message: string; details?: unknown }
  | { kind: 'rateLimit'; status: 429; message: string }
  | { kind: 'server'; status: number; message: string }
  | { kind: 'network'; message: string };

export const errorNormalizingInterceptor: HttpInterceptorFn = (req, next) => {
  const correlationId = crypto.randomUUID();
  const withId = req.clone({ setHeaders: { 'X-Correlation-Id': correlationId } });

  return next(withId).pipe(
    catchError((err: HttpErrorResponse) => {
      const normalized: AppError =
        err.status === 0
          ? { kind: 'network', message: 'Network error' }
          : err.status === 401 || err.status === 403
          ? { kind: 'auth', status: err.status, message: 'Not authorized' }
          : err.status === 400 || err.status === 422
          ? { kind: 'validation', status: err.status, message: 'Validation failed', details: err.error }
          : err.status === 429
          ? { kind: 'rateLimit', status: 429, message: 'Too many requests' }
          : { kind: 'server', status: err.status, message: 'Server error' };

      return throwError(() => ({ correlationId, error: normalized }));
    })
  );
};
