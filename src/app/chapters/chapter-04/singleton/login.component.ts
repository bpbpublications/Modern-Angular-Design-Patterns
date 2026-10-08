import { Component, inject } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
  standalone: true,
  selector: 'app-login',
  template: `
    <button (click)="login()">Login</button>
    <button (click)="logout()">Logout</button>
    <p>User Authenticated: {{ isAuthenticated }}</p>
  `
})
export class LoginComponent {
  isAuthenticated = false;
  private authService = inject(AuthService);

  login() {
    this.authService.login();
    this.isAuthenticated = this.authService.checkAuthStatus();
  }
  logout() {
    this.authService.logout();
    this.isAuthenticated = this.authService.checkAuthStatus();
  }
}
