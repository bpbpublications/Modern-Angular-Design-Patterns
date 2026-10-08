// ============================================================================
// REFERENCE FILE ONLY: Initial "Step 2" Version Of http-error.interceptor.ts
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The book later evolves this same file to add the SILENT_REQUEST opt-out (see
// http-error.interceptor.ts, which is the version actually registered).
// ============================================================================
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorHandlingService } from './error-handling.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const handler = inject(ErrorHandlingService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      handler.handleError(error);
      return throwError(() => error);
    })
  );
};
