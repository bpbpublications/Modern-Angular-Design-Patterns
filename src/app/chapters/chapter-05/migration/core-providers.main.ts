// ============================================================================
// REFERENCE FILE ONLY: Dropping CoreModule And Registering Providers At The Root
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// APP_CONFIG and environment are supporting declarations (see app-config.ts).
// ============================================================================
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { APP_CONFIG, environment } from './app-config';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: APP_CONFIG, useValue: environment.config }
  ]
});
