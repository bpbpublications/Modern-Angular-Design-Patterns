// The consolidated NavigationService that centralizes Router.events 
// handling (loading signal, analytics, notifications, diagnostics).
import { Injectable, DestroyRef, inject, signal } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  RoutesRecognized,
  GuardsCheckStart,
  GuardsCheckEnd,
} from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AnalyticsService } from './services/analytics.service';
import { NotificationService } from './services/notification.service';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  // Global UI state exposed as a signal
  readonly loading = signal(false);

  private analytics = inject(AnalyticsService);
  private notifications = inject(NotificationService);

  constructor() {
    this.router.events
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(
          e =>
            e instanceof NavigationStart ||
            e instanceof NavigationEnd ||
            e instanceof NavigationCancel ||
            e instanceof NavigationError ||
            e instanceof RoutesRecognized ||
            e instanceof GuardsCheckStart ||
            e instanceof GuardsCheckEnd
        )
      )
      .subscribe(e => {
        if (e instanceof NavigationStart) {
          this.loading.set(true);
          return;
        }

        if (e instanceof NavigationEnd) {
          this.loading.set(false);
          window.scrollTo(0, 0);
          this.analytics.trackPageView(e.urlAfterRedirects);
          return;
        }

        if (e instanceof NavigationCancel) {
          this.loading.set(false);
          this.notifications.warn('Navigation was cancelled.');
          return;
        }

        if (e instanceof NavigationError) {
          this.loading.set(false);
          this.notifications.error('Failed to load route.');
          return;
        }

        // Optional: debugging/diagnostics events
        if (e instanceof RoutesRecognized) {
          console.debug('Routes recognized:', e.urlAfterRedirects);
        }

        if (e instanceof GuardsCheckStart) {
          console.debug('Guards start:', e.url);
        }

        if (e instanceof GuardsCheckEnd) {
          console.debug('Guards end:', e.url, 'ok=', e.shouldActivate);
        }
      });
  }
}
