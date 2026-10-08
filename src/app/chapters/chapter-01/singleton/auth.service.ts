import { Injectable } from '@angular/core';

// Singleton in this Angular app runtime
@Injectable({ providedIn: 'root' }) 
export class AuthService {
  private token: string | null = null;

  setToken(token: string) { this.token = token; }
  getToken() { return this.token; }
}
