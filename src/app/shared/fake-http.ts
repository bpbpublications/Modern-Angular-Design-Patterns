import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, delay, mergeMap, of, throwError } from 'rxjs';

// Shared by the chapter fake-backend interceptors 
// so each doesn't hand-roll its own ok()/fail() response fabrication.
export function fakeHttpOk<T>(
  url: string,
  body: T,
  options?: { status?: number; delayMs?: number }
): Observable<HttpResponse<T>> {
  const { status = 200, delayMs = 300 } = options ?? {};
  return of(new HttpResponse({ status, body, url })).pipe(delay(delayMs));
}

export function fakeHttpFail(
  url: string,
  status: number,
  statusText: string,
  options?: { delayMs?: number; error?: unknown }
): Observable<never> {
  const { delayMs = 300, error } = options ?? {};
  return of(null).pipe(
    delay(delayMs),
    mergeMap(() => throwError(() => new HttpErrorResponse({ status, statusText, url, error })))
  );
}
