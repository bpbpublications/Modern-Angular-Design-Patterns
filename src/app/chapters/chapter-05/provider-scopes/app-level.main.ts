// ============================================================================
// REFERENCE FILE ONLY: App-Level Provider Example (API_BASE_URL In main.ts)
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// ============================================================================
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from '../migration/app/app.component';
import { API_BASE_URL } from './api-base-url.token';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: API_BASE_URL, useValue: 'https://api.example.com' }
  ]
});
