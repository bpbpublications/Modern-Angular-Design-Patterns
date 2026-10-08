// ============================================================================
// REFERENCE FILE ONLY: NavigationStart / End / Cancel / Error Fragments
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The book presents these as fragments of the consolidated NavigationService
// example (see navigation.service.ts).
// ============================================================================
import { Injectable, inject } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { NotificationService } from './services/notification.service';

@Injectable()
export class LifecycleSnippets {
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  loading = false;

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }
      if (event instanceof NavigationEnd) {
        this.loading = false;
        window.scrollTo(0, 0);
      }
      if (event instanceof NavigationCancel) {
        this.loading = false;
        this.notificationService.warn('Navigation was cancelled.');
      }
      if (event instanceof NavigationError) {
        this.loading = false;
        this.notificationService.error('Failed to load route.');
      }
    });
  }
}
