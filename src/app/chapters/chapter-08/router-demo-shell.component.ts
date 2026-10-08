// ============================================================================
// GLUE FILE: Shell For The Routed Chapter 8 Demos
// ============================================================================
// This file is NOT book code. It is the shell for the routed Chapter 8 demos
// mounted at /chapter-08/router-demo. It hosts the primary <router-outlet>,
// the book's named sidebar outlet ("Template usage" snippet:
// <router-outlet name="sidebar"></router-outlet>), the auth toggles that
// drive the guard demos, the loading indicators from the router-lifecycle
// section, and quick navigation links. It never modifies book code.
// ============================================================================
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './router-guards/auth.service';
import { NavigationService } from './router-lifecycle/navigation.service';
import { RouterDebugEvents } from './router-lifecycle/debug-events';
import { ListeningAllEventsComponent } from './router-lifecycle/listening-all-events.component';

// Landing view for the demo's empty path, so the wildcard 404
// route only catches genuinely unknown URLs.
@Component({
  standalone: true,
  selector: 'app-ch8-router-demo-index',
  template: `<p>Pick one of the routed demos above — each link activates the book's route configuration for real.</p>`,
})
export class RouterDemoIndexComponent {}

@Component({
  standalone: true,
  selector: 'app-ch8-router-demo-shell',
  imports: [RouterLink, RouterOutlet, ListeningAllEventsComponent],
  template: `
    <h2>Chapter 8 — Router demo playground</h2>
    <p class="back"><a routerLink="/chapter-08">← Back to Chapter 8</a></p>

    <div class="panel">
      <strong>Auth state (drives the guard demos):</strong>
      logged in: <code>{{ auth.loggedIn() }}</code> — role: <code>{{ auth.role() }}</code>
      <button (click)="auth.logIn('user')">Log in as user</button>
      <button (click)="auth.logIn('admin')">Log in as admin</button>
      <button (click)="auth.logOut()">Log out</button>
    </div>

    <div class="panel">
      <strong>Router lifecycle:</strong>
      NavigationService.loading() = <code>{{ nav.loading() }}</code> ·
      <app-ch8-listening-all-events />
      <span class="hint">(the delayed resolver on the user routes makes the flags visible)</span>
    </div>

    <nav class="panel">
      <span>Basic:</span>
      <a routerLink="basic/home">home</a>
      <a routerLink="basic/about">about</a>
      <span>Dynamic:</span>
      <a routerLink="dynamic/user/101">user/101</a>
      <a routerLink="dynamic/product/angular-book">product/angular-book</a>
      <a [routerLink]="['params', 7]" [queryParams]="{ term: 'signals' }">params/7</a>
      <a routerLink="live-user/1">live-user/1</a>
      <a routerLink="search" [queryParams]="{ term: 'angular', page: 2 }">search</a>
      <span>Guards:</span>
      <a routerLink="dashboard">dashboard</a>
      <a routerLink="edit/42">edit/42</a>
      <a routerLink="user/101">user/101 (resolver)</a>
      <a routerLink="user-inline/102">user-inline/102</a>
      <a routerLink="user/0">user/0 (resolver fallback)</a>
      <a routerLink="admin">admin</a>
      <span>Complex:</span>
      <a routerLink="settings/profile">settings/profile</a>
      <a routerLink="settings/security">settings/security</a>
      <button (click)="openChat()">Open chat sidebar</button>
      <button (click)="closeChat()">Close chat sidebar</button>
      <span>Route reuse:</span>
      <a routerLink="reuse-demo/cached">cached</a>
      <a routerLink="reuse-demo/uncached">uncached</a>
      <a routerLink="totally-unknown-path">unknown URL (404)</a>
    </nav>

    <div class="outlets">
      <div class="primary">
        <router-outlet />
      </div>
      <div class="sidebar">
        <!-- n5: -->
        <router-outlet name="sidebar"></router-outlet>
      </div>
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
      gap: 8px;
      align-items: center;
    }
    nav span { color: #5a5f7d; font-weight: 600; }
    .hint { color: #8a8fae; }
    .outlets { display: flex; gap: 16px; align-items: flex-start; }
    .primary {
      flex: 1;
      background: #fff;
      border: 1px solid #e3e5f0;
      border-radius: 10px;
      padding: 12px 16px;
      min-height: 120px;
    }
    .sidebar { min-width: 220px; }
  `,
})
export class RouterDemoShellComponent {
  readonly auth = inject(AuthService);
  readonly nav = inject(NavigationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    // Activates RoutesRecognized/GuardsCheck debugging snippet
    // (console.debug output is visible in the browser devtools).
    inject(RouterDebugEvents);
  }

  // RelativeTo pathes, because the demo mounts the sidebar route under
  // /chapter-08/router-demo instead of the app root (see
  // complex-routing/aux-navigation.ts).
  openChat() {
    this.router.navigate([{ outlets: { sidebar: ['chat'] } }], { relativeTo: this.route });
  }

  closeChat() {
    this.router.navigate([{ outlets: { sidebar: null } }], { relativeTo: this.route });
  }
}
