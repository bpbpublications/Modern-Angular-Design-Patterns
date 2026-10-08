import { USER_API, UserHttpService, UserService } from './user-feature';

export function provideUserFeature() {
  return [
    { provide: USER_API, useClass: UserHttpService },
    UserService
  ];
}
