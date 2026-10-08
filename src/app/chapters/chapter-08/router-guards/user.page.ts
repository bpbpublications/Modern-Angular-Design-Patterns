import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-ch8-guards-user-page',
  template: `
    <h3>User page</h3>
    @if (data()['user']; as user) {
      <p>Resolved user: <code>{{ user.id }} — {{ user.name }}</code></p>
    } @else {
      <p>
        Resolved user: <code>null</code> — the resolver failed and
        <code>catchError(() =&gt; of(null))</code> provided the safe fallback.
      </p>
    }
  `,
})
export class UserPage {
  private route = inject(ActivatedRoute);
  readonly data = toSignal(this.route.data, { initialValue: this.route.snapshot.data });
}
