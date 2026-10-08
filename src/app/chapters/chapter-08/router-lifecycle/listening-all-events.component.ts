// ============================================================================
// GLUE FILE: Hosting The Streamlined "Listening To All Navigation Events" Snippet
// ============================================================================
// This file is NOT book code. It hosts the second "Listening to all
// navigation events" snippet (the streamlined filter + loading-flag version).
// ============================================================================
import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from
'@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef, inject } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-ch8-listening-all-events',
  template: `
    <span [class.on]="loading">
      loading = <code>{{ loading }}</code>
    </span>
  `,
  styles: `
    span {
      font-size: 12.5px;
      color: #5a5f7d;
      &.on { color: #b5541c; font-weight: 600; }
    }
  `,
})
export class ListeningAllEventsComponent {
  loading = false;

  constructor() {
    const router = inject(Router);
    const destroyRef = inject(DestroyRef);

    router.events.pipe(
      takeUntilDestroyed(destroyRef),
      filter(e =>
        e instanceof NavigationStart ||
        e instanceof NavigationEnd ||
        e instanceof NavigationCancel ||
        e instanceof NavigationError
      )
    ).subscribe(e => {
      this.loading = e instanceof NavigationStart;
    });
  }
}
