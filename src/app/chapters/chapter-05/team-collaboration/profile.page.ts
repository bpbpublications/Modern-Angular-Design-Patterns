import { Component, inject } from '@angular/core';
import { PROFILE_API } from './profile-api';

@Component({
  standalone: true,
  selector: 'app-profile-page',
  template: `<p>Profile page — PROFILE_API.getProfile(): <code>{{ profile.username }}</code></p>`,
})
export class ProfilePage {
  readonly profile = inject(PROFILE_API).getProfile();
}
