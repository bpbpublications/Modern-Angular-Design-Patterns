import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = new User(1, 'John Doe', 'john@example.com');
  getUser(id: number): User {
    return this.user;
  }
  updateUser(updatedUser: User) {
    this.user = updatedUser;
    console.log('User updated:', this.user);
  }
}
