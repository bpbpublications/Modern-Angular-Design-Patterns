import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { UserService } from './user.service';
import { User } from './user.model'; 

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    @if (user$ | async; as user) {
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    } @else if (loading) {
      <div class="loading">Loading user data...</div>
    } @else {
      <p>No user data available.</p>
    }
  `
})
export class UserProfileComponent {
  private userService = inject(UserService);
  
  loading = true;
  user$: Observable<User> = this.userService.getUser().pipe(tap(() => (this.loading = false)));
}
