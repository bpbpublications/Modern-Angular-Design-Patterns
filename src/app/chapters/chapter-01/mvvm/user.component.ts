import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { User } from './user.model';
@Component({
  selector: 'app-user',
  imports: [FormsModule],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  user!: User;
  private userService = inject(UserService);

  ngOnInit() {
    this.user = this.userService.getUser(1);
  }
  updateUser() {
    this.userService.updateUser(this.user);
  }
}
