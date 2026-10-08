import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchApiService {
  private http = inject(HttpClient);

  search(value: string | null): Observable<string[]> {
    return this.http.get<string[]>(`/api/search?q=${value ?? ''}`);
  }
}
