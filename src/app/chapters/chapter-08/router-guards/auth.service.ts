// The signal-backed state and the logIn/logOut demo methods are glue
// so the guards can be toggled interactively from the chapter page.
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly loggedIn = signal(false);
  readonly role = signal<'user' | 'admin'>('user');

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  hasRole(role: string): boolean {
    return this.isLoggedIn() && this.role() === role;
  }

  logIn(role: 'user' | 'admin' = 'user') {
    this.loggedIn.set(true);
    this.role.set(role);
    console.log(`AuthService: logged in with role '${role}'`);
  }

  logOut() {
    this.loggedIn.set(false);
    this.role.set('user');
    console.log('AuthService: logged out');
  }
}
