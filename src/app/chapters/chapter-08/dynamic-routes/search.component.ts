// ============================================================================
// GLUE FILE: Hosting The "Access Query Parameters" Snippet
// ============================================================================
// This file is hosts the book's queryParamMap + takeUntilDestroyed snippet 
// ("Access query parameters in the component").
// ============================================================================
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-ch8-search',
  template: `
    <h4>Search (query params) demo</h4>
    <p>term: <code>{{ term() }}</code> — page: <code>{{ page() }}</code></p>
  `,
})
export class SearchComponent {
  private route = inject(ActivatedRoute);

  private destroyRef = inject(DestroyRef);

  readonly term = signal<string|null>('');
  readonly page = signal<string|null>('');

 constructor() {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        this.term.set(params.get('term'));
        this.page.set(params.get('page'));
      });
  }
}
