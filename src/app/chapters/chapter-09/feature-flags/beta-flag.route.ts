// The canMatch guard that prevents the lazy 'beta' route 
// from matching when the feature flag is disabled.
import { inject } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FeatureService } from './feature.service';

export const betaRoute: Route =
{
  path: 'beta',
  loadChildren: () => import('./beta.routes').then(m => m.BETA_ROUTES),
  canMatch: [() => {
    const flags = inject(FeatureService);
    const router = inject(Router);
    return flags.isFeatureEnabled('enableBeta') || router.createUrlTree(['/']);
  }]
};
