// ============================================================================
// REFERENCE FILE ONLY: Providing An Implementation For PRODUCT_API At App Scope
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// ============================================================================
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../migration/app/app.component';
import { PRODUCT_API } from './tokens';
import { RealProductApiService } from './services/real-product-api.service';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: PRODUCT_API, useClass: RealProductApiService }
  ]
});
