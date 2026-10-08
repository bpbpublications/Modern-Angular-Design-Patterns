// ============================================================================
// REFERENCE FILE ONLY: PreloadAllModules Usage (Bootstrap-Level Configuration)
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The real application bootstraps from src/main.ts, and withPreloading(...)
// can only be applied there.
// ============================================================================
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withPreloading, PreloadAllModules } from
'@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules))
    // or: withPreloading(SelectivePreloadingStrategy)
  ]
});
