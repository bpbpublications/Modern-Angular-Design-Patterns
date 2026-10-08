// adapters/user.adapter.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserApi } from '../api/user.api';

@Injectable({ providedIn: 'root' })
export class UserAdapter {
  adapt(api: UserApi): User {
    return {
      id: api.user_id,
      name: api.user_name,
      createdAt: new Date(api.account_created),
    };
  }

  toApi(user: User): UserApi {
    return {
      user_id: user.id,
      user_name: user.name,
      account_created: user.createdAt.toISOString(),
    };
  }
}
