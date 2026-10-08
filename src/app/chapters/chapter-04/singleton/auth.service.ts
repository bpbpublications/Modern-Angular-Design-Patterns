import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'  // Ensures a single instance across the app
})
export class AuthService {
  private isAuthenticated = false;
  login() {
    this.isAuthenticated = true;
    console.log('User logged in');
  }
  logout() {
    this.isAuthenticated = false;
    console.log('User logged out');
  }
  checkAuthStatus() {
    return this.isAuthenticated;
  }
}
