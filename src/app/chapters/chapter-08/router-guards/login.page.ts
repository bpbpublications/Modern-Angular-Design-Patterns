// The buttons are for demo purposes so the guard can be satisfied and retried from here.
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  standalone: true,
  selector: 'app-ch8-login-page',
  imports: [RouterLink],
  template: `
    <h3>Login</h3>
    <p>A router guard blocked the navigation and redirected you here.</p>
    <p>
      <button (click)="auth.logIn('user')">Log in as user</button>
      <button (click)="auth.logIn('admin')">Log in as admin</button>
    </p>
    <p>
      Then retry:
      <a routerLink="../dashboard">dashboard (CanActivate)</a> ·
      <a routerLink="../admin">admin (CanMatch, needs the admin role)</a>
    </p>
  `,
})
export class LoginPage {
  readonly auth = inject(AuthService);
}
