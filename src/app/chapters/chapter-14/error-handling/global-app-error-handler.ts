import { ErrorHandler, Injectable, inject, InjectionToken } from '@angular/core';
export interface Logger {
  error(event: string, payload: Record<string, unknown>): void;
}

// Provide LOGGER at bootstrap
export const LOGGER = new InjectionToken<Logger>('LOGGER');

@Injectable({ providedIn: 'root' })
export class GlobalAppErrorHandler implements ErrorHandler {
  private logger = inject(LOGGER);

  handleError(err: unknown): void {
    const safeMessage = err instanceof Error ? err.message : 'Unknown error';

    this.logger.error('unhandled_exception', {
      message: safeMessage,
      // include route/version/correlation id here if available
    });

    // In real apps, you might also notify monitoring here (Sentry/AppInsights/etc.)
    // and show a safe fallback UI.
    console.error(err);
  }
}
