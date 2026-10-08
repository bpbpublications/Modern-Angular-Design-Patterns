// ============================================================================
// REFERENCE FILE ONLY: Registering The Shared Feature Provider At App Scope
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The demo applies provideUserFeature() to a demo host component instead.
// ============================================================================
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../migration/app/app.component';
import { provideUserFeature } from './provide-user-feature';

bootstrapApplication(AppComponent, {
  providers: [
    ...provideUserFeature()
  ]
});
