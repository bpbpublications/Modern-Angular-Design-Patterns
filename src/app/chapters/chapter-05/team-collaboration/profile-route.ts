// ============================================================================
// REFERENCE FILE ONLY: Encapsulating Features With Route Providers
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// This route is not mounted in the demo app; the demo hosts ProfilePage with
// the same provider on a host component instead. 
// ============================================================================
import { Route } from '@angular/router';
import { PROFILE_API, ProfileService } from './profile-api';

const profileRoute: Route =
{
  path: 'profile',
  loadComponent: () => import('./profile.page').then(m => m.ProfilePage),
  providers: [{ provide: PROFILE_API, useClass: ProfileService }]
};
