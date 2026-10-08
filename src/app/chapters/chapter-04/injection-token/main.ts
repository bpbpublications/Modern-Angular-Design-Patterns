// ============================================================================
// REFERENCE FILE ONLY: Providing An InjectionToken At The App Edge
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The actual application bootstraps from src/main.ts.
// ============================================================================
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { API_URL } from './api-url.token';

// main.ts — provide the token at the app edge
bootstrapApplication(AppComponent, {
  providers: [{ provide: API_URL, useValue: 'https://api.example.com' }]
});
