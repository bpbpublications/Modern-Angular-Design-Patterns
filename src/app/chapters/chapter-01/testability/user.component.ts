import { Component, inject } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  template: `<p>User: {{ user?.name }}</p>`
})
export class UserComponent {
  user: any;
  private userService = inject(UserService);

  ngOnInit() {
    this.userService.getUserById(1).subscribe(user => this.user = user);
  }
}
