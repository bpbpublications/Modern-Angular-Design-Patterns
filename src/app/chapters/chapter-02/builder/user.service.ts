import { Injectable } from '@angular/core';
import { UserProfile } from './userProfile';
import { UserProfileBuilder } from './userProfileBuilder';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  createUserProfile(): UserProfile {
    return new UserProfileBuilder()
      .setName('Alice Johnson')
      .setAge(28)
      .build();
  }
}
