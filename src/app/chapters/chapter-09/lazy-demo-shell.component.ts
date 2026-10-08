// ============================================================================
// GLUE FILE: Shell For The Routed Chapter 9 Demos
// ============================================================================
// This file is NOT book code. It is the shell for the routed Chapter 9 demos
// mounted at /chapter-09/lazy-demo. Hosts the router outlet plus quick links;
// the lazy chunks are visible in the browser's network tab.
// ============================================================================
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

// Landing view for the demo's empty path.
@Component({
  standalone: true,
  selector: 'app-ch9-lazy-demo-index',
  template: `
    <p>
      Open the network tab, then pick a feature above — each chunk downloads only on first
      navigation.
    </p>
  `,
})
export class LazyDemoIndexComponent {}

@Component({
  standalone: true,
  selector: 'app-ch9-lazy-demo-shell',
  imports: [RouterLink, RouterOutlet],
  template: `
    <h2>Chapter 9 — Lazy loading playground</h2>
    <p class="back"><a routerLink="/chapter-09">← Back to Chapter 9</a></p>

    <nav class="panel">
      <a routerLink="admin">admin (lazy pattern)</a>
      <a routerLink="dashboard">dashboard (feature routes)</a>
      <a routerLink="dashboard/users">dashboard/users</a>
      <a routerLink="reports">reports (preload-flagged)</a>
      <a routerLink="beta">beta (canMatch feature flag)</a>
    </nav>

    <div class="outlet">
      <router-outlet />
    </div>
  `,
  styles: `
    h2 { margin: 0 0 4px; }
    .back { margin-top: 0; }
    .panel {
      background: #fff;
      border: 1px solid #e3e5f0;
      border-radius: 10px;
      padding: 10px 14px;
      margin-bottom: 10px;
      font-size: 13.5px;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .outlet {
      background: #fff;
      border: 1px solid #e3e5f0;
      border-radius: 10px;
      padding: 12px 16px;
      min-height: 100px;
    }
  `,
})
export class LazyDemoShellComponent {}
