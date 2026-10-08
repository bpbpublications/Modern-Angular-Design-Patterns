import { inject } from '@angular/core';
import { UserService } from './user.service';

class UserComponent {
  private userService = inject(UserService);

  getUser() {
    this.userService.getUser();
  }
}

export { UserComponent };
