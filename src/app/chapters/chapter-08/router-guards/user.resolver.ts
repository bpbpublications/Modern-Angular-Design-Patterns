import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './user.service';
import { catchError, of } from 'rxjs';
import type { User } from './user.service';

export const userResolver: ResolveFn<User | null> = (route) =>
  inject(UserService)
    .getUserById(route.paramMap.get('id')!)
    .pipe(catchError(() => of(null))); // provide a safe fallback
