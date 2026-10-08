// ============================================================================
// GLUE FILE: Shared Tab Component For The Route Reuse Strategy Demo
// ============================================================================
// This file is NOT book code. It's shared by both the 'cached' and 'uncached'
// routes (see router-demo.routes.ts) so the only difference between them is
// the data: { reuse: true } flag CustomRouteReuseStrategy checks. Typing
// text, switching tabs, and coming back shows whether this component
// instance (and its createdAt timestamp) was reused or recreated.
// ============================================================================
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-ch8-reuse-tab',
  imports: [FormsModule],
  template: `
    <p><strong>{{ label }}</strong> — component created at {{ createdAt }}</p>
    <label>
      Type something, switch tabs, then come back:
      <input [(ngModel)]="text" />
    </label>
  `,
})
export class ReuseTabComponent {
  private route = inject(ActivatedRoute);
  readonly label = this.route.snapshot.data['label'] as string;
  readonly createdAt = new Date().toLocaleTimeString();
  text = '';
}
