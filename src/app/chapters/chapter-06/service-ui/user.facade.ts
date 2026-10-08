// Service + UI coordination — UserFacade wraps an HTTP request
// in a signal and computes a loading indicator.
import { Injectable, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  private http = inject(HttpClient);
  private user$ = this.http.get('/api/user');
  user = toSignal(this.user$, { initialValue: null });
  loading = computed(() => this.user() === null);
}
