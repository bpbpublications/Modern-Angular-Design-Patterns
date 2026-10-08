// ============================================================================
// GLUE FILE: Hosting The paramMap + takeUntilDestroyed Snippet
// ============================================================================
// This file is NOT book code. It hosts the book's paramMap + takeUntilDestroyed
// snippet ("ideal for long-lived pages that react to route changes").
// ============================================================================
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { inject, DestroyRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-ch8-live-user-param',
  imports: [RouterLink],
  template: `
    <h4>Long-lived paramMap subscription demo</h4>
    <p>Current userId: <code>{{ userId }}</code></p>
    <p>
      The same component instance stays alive while the parameter changes:
      <a routerLink="../1">/user/1</a> ·
      <a routerLink="../2">/user/2</a> ·
      <a routerLink="../3">/user/3</a>
    </p>
  `,
})
export class LiveUserParamComponent {
  userId!: string;

  constructor() {
    const route = inject(ActivatedRoute);
    const destroyRef = inject(DestroyRef);

    route.paramMap
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe(params => {
        this.userId = params.get('id')!;
      });
  }
}
