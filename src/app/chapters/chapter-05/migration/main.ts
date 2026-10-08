// ============================================================================
// REFERENCE FILE ONLY: Replacing AppModule With bootstrapApplication
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The actual application bootstraps from src/main.ts.
// ============================================================================
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
