// user-profile.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, of, Observable } from 'rxjs';
import { UserProfile } from './user-profile.model';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private http = inject(HttpClient);

  getProfile(): Observable<UserProfile> {
    // Mocked/stubbed for demo purposes — the real HttpClient call is commented out below.
    // return this.http.get<{ name: string; age: number; email: string }>('/api/profile').pipe(
    //   map(response => new UserProfile(response.name, response.age, response.email))
    // );
    return of(new UserProfile('Alice', 30, 'alice@example.com'));
  }
}
