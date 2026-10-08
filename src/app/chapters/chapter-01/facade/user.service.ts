import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  getUserById(userId: number): Observable<{ id: number; name: string }> {
    return of({ id: userId, name: 'John Doe' }).pipe(delay(300));
  }
}
