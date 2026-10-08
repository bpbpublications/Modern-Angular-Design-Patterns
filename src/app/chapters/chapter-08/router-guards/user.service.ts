// The artificial delay makes the resolver observable in the demo's
// loading indicator, and id '0' fails so the resolver's catchError fallback
// can be demonstrated.
import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { delay, mergeMap } from 'rxjs';

export interface User {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  getUserById(id: string): Observable<User> {
    console.log(`UserService.getUserById('${id}') — resolving…`);
    if (id === '0') {
      return timer(700).pipe(
        mergeMap(() => throwError(() => new Error(`User '${id}' not found`)))
      );
    }
    return of({ id, name: `User #${id}` }).pipe(delay(700));
  }
}
