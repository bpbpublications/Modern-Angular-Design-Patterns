// ============================================================================
// GLUE FILE: Hosting The "Runtime Import" Feature-Flag Snippet
// ============================================================================
// This file is NOT book code. It hosts the book's "runtime import"
// feature-flag snippet ("If a feature does not require its own route but
// should be displayed conditionally, use a runtime import instead").
// ============================================================================
import { Injectable, inject } from '@angular/core';
import { FeatureService } from './feature.service';

@Injectable({ providedIn: 'root' })
export class ConditionalFeatureLoader {
  private featureService = inject(FeatureService);

  loadReportsIfEnabled() {
    if (this.featureService.isFeatureEnabled('showReports')) {
      import('./reports/reports.component').then(({ ReportsComponent }) => {
        // Do something with the component dynamically (e.g. render in view container)
      });
    }
  }
}
