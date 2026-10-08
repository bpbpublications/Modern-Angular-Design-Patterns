// ============================================================================
// GLUE FILE: Hosting The "Accessing Route Parameters" toSignal Snippet
// ============================================================================
// This file is NOT book code. It hosts the book's "Accessing route parameters
// in the component" toSignal snippet. 
// ============================================================================
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { inject, Signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-ch8-param-signals',
  template: `
    <h4>toSignal(route.paramMap) demo</h4>
    <p>id: <code>{{ id() ?? 'null' }}</code> — term: <code>{{ term() }}</code></p>
    <p>Change the <code>:id</code> segment or the <code>?term=</code> query param and watch the signals update.</p>
  `,
})
export class ParamSignalsComponent {
  readonly id: Signal<string | null>;
  readonly term: Signal<string | null>;

  constructor() {
    const route = inject(ActivatedRoute);
    const id = toSignal(route.paramMap.pipe(map(p => p.get('id'))),
      { initialValue: null });
    const term = toSignal(route.queryParamMap.pipe(map(p => p.get('term'))),
      { initialValue: '' });
    this.id = id;
    this.term = term;
  }
}
