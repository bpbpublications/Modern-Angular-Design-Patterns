// Managing subscriptions and preventing memory leaks —
// takeUntilDestroyed used for a manual subscription.
import { Component, inject, DestroyRef } from '@angular/core';
import { interval } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({ standalone: true, selector: 'app-ticker', template: `{{ tick }}` })
export class TickerComponent {
  tick = 0;
  private destroyRef = inject(DestroyRef);

  constructor() {
    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(v => this.tick = v);
  }
}
