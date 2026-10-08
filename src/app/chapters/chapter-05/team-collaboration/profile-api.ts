import { Injectable, InjectionToken } from '@angular/core';

export interface ProfileApi {
  getProfile(): { username: string };
}

export const PROFILE_API = new InjectionToken<ProfileApi>('PROFILE_API');

@Injectable()
export class ProfileService implements ProfileApi {
  getProfile() {
    console.log('ProfileService.getProfile() → { username: "ada" }');
    return { username: 'ada' };
  }
}
