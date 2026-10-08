// ============================================================================
// REFERENCE FILE ONLY: Best Practices For Angular Routing
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// It collects the section's small code fragments verbatim for reference:
// - Handle wildcard and fallback routes
// - Avoid hardcoding route paths in templates
// ============================================================================
import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { RouterLink } from '@angular/router';

// Handle wildcard and fallback routes
export const wildcardExample: Route =
  { path: '**', redirectTo: '/not-found' };

// Avoid hardcoding route paths in templates
@Component({
  standalone: true,
  selector: 'app-ch8-router-link-example',
  imports: [RouterLink],
  template: `
    <a [routerLink]="['/products', product.id]">View</a>
  `,
})
export class RouterLinkExampleComponent {
  product = { id: 42 };
}
