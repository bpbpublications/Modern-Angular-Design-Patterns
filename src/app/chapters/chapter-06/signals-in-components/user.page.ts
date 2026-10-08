// user.page.ts
import { Component, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-user-page',
  imports: [JsonPipe],
  template: `
    @if (loading()) {
      <p>Loading…</p>
    }
    @if (user()) {
      <pre>{{ user() | json }}</pre>
    }
  `
})
export class UserPage {
  private http = inject(HttpClient);

  private user$ = this.http.get<{ id: number; name: string }>('/api/user')
    .pipe(startWith(null));

  // Observable ➝ Signal
  readonly user = toSignal(this.user$, { initialValue: null });
  readonly loading = computed(() => this.user() === null);
}
