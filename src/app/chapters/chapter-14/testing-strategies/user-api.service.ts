import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface User {
  id: string;
  name: string;
}

interface UserApiDto {
  id: string;
  full_name: string;
}

@Injectable()
export class UserApiService {
  private http = inject(HttpClient);

  getUser(id: string): Promise<User> {
    return firstValueFrom(this.http.get<UserApiDto>(`/api/users/${id}`)).then((dto) => ({
      id: dto.id,
      name: dto.full_name,
    }));
  }
}
