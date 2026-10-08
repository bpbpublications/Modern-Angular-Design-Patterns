import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>(null);

  login(user: User) {
    this.currentUser.next(user);
  }

  logout() {
    this.currentUser.next(null);
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }
}
