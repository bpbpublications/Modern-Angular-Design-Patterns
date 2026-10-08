import { Injectable, InjectionToken, inject } from '@angular/core';

export interface UserApi {
  getUser(): { name: string };
}

export const USER_API = new InjectionToken<UserApi>('USER_API');

@Injectable()
export class UserHttpService implements UserApi {
  getUser() {
    console.log('UserHttpService.getUser() → { name: "Ada Lovelace" }');
    return { name: 'Ada Lovelace' };
  }
}

@Injectable()
export class UserService {
  private api = inject(USER_API);

  loadUser() {
    const user = this.api.getUser();
    console.log('UserService.loadUser() received:', user);
    return user;
  }
}
