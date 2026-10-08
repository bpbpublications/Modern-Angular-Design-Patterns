// data/users.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { User } from '../models/user.model';
import { UserApi } from '../api/user.api';
import { UserAdapter } from '../adapters/user.adapter';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);
  private adapter = inject(UserAdapter);

  getUser(id: number) {
    return this.http.get<UserApi>(`/api/users/${id}`).pipe(
      map(api => this.adapter.adapt(api))
    );
  }

  getUsers() {
    return this.http.get<UserApi[]>(`/api/users`).pipe(
      map(list => list.map(api => this.adapter.adapt(api)))
    );
  }

  saveUser(user: User) {
    return this.http.post(`/api/users`, this.adapter.toApi(user));
  }
}
