// ============================================================================
// REFERENCE FILE ONLY: Registering The Interceptor At Application Bootstrap
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The demo registers the interceptor via CHAPTER_11_ROUTES instead.
// ============================================================================
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { httpErrorInterceptor } from './shared/http-error.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([httpErrorInterceptor]) // functional (recommended)
    )
  ]
});
