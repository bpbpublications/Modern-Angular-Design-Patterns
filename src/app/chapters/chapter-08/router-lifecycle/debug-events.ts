// ============================================================================
// GLUE FILE: Hosting The "RoutesRecognized / GuardsCheckStart/End" Snippet
// ============================================================================
// This file is NOT book code. It hosts the book's "RoutesRecognized and
// GuardsCheckStart/End" debugging snippet.
// ============================================================================
import { Injectable } from '@angular/core';
import { inject, DestroyRef } from '@angular/core';
import { Router, RoutesRecognized, GuardsCheckStart, GuardsCheckEnd } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class RouterDebugEvents {
  constructor() {
    const router = inject(Router);
    const destroyRef = inject(DestroyRef);

    router.events.pipe(
      takeUntilDestroyed(destroyRef),
      filter(e =>
        e instanceof RoutesRecognized ||
        e instanceof GuardsCheckStart ||
        e instanceof GuardsCheckEnd
      )
    ).subscribe(e => {
      if (e instanceof RoutesRecognized) console.debug('Routes:', e.urlAfterRedirects);
      if (e instanceof GuardsCheckStart) console.debug('Guards start:', e.url);
      if (e instanceof GuardsCheckEnd) console.debug('Guards end:', e.url, 'ok=',
e.shouldActivate);
    });
  }
}
