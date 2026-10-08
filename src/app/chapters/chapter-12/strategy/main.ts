// ============================================================================
// REFERENCE FILE ONLY: Default Provider For The VALIDATION_STRATEGY Token
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The real application bootstraps from src/main.ts.
// ============================================================================
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { VALIDATION_STRATEGY } from './validation-strategy.token';
import { EmailValidationStrategy } from './email-validation.strategy';

bootstrapApplication(AppComponent, {
  providers: [{ provide: VALIDATION_STRATEGY, useClass: EmailValidationStrategy }]
});
