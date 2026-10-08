// ============================================================================
// REFERENCE FILE ONLY: Factory Pattern Wired Through Angular DI Providers
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The actual application bootstraps from src/main.ts.
// ============================================================================
import { InjectionToken } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { type Notification, EmailNotification, SMSNotification } from './notification-factory';
import { environment } from './environment';
import { AppComponent } from './app.component';

// Or using with providers
export const NOTIFICATION = new InjectionToken<Notification>('NOTIFICATION');

bootstrapApplication(AppComponent, {
  providers: [
    { provide: NOTIFICATION, useFactory: () => (environment.email ? new EmailNotification() : new SMSNotification()) }
  ]
});
