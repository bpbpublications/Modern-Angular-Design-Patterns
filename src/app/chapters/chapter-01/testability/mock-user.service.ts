import { of } from 'rxjs';

class MockUserService {
  getUserById() {
    return of({ name: 'Mock User' });
  }
}

export { MockUserService };
