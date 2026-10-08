// shared/http-error.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorHandlingService } from './error-handling.service';
import { SILENT_REQUEST } from './http-context-tokens';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const handler = inject(ErrorHandlingService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (!req.context.get(SILENT_REQUEST)) {
        handler.handleError(error);
      }
      return throwError(() => error);
    })
  );
};
