import { Injectable } from '@angular/core';
import { Observable, throwError, timer } from 'rxjs';
import { map, mergeMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  saveUser(user: any): Observable<unknown> {
    console.log('UserService.saveUser →', JSON.stringify(user));
    if (String(user?.email ?? '').includes('fail')) {
      return timer(900).pipe(
        mergeMap(() => throwError(() => new Error('Server rejected the user')))
      );
    }
    return timer(900).pipe(map(() => ({ ok: true })));
  }
}
