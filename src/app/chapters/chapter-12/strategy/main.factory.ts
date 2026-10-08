// ============================================================================
// REFERENCE FILE ONLY: Factory Provider Picking VALIDATION_STRATEGY At Startup
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The real application bootstraps from src/main.ts.
// ============================================================================
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { VALIDATION_STRATEGY } from './validation-strategy.token';
import { EmailValidationStrategy } from './email-validation.strategy';
import { PhoneValidationStrategy } from './phone-validation.strategy';
import { UserContextService } from './user-context.service';

bootstrapApplication(AppComponent, {
  providers: [
    EmailValidationStrategy,
    PhoneValidationStrategy,
    {
      provide: VALIDATION_STRATEGY,
      useFactory: (
        userContext: UserContextService,
        emailStrategy: EmailValidationStrategy,
        phoneStrategy: PhoneValidationStrategy
      ) => {
        return userContext.prefersPhoneValidation()
          ? phoneStrategy
          : emailStrategy;
      },
      deps: [UserContextService, EmailValidationStrategy, PhoneValidationStrategy]
    }
  ]
});
