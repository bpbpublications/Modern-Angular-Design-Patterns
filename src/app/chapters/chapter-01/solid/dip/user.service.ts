import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  getUser() {
    console.log('UserService.getUser() called via DI');
    return { name: 'John Doe' };
  }
}
