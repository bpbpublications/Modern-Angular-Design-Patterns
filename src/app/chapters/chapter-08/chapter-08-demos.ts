// ============================================================================
// DEMO HOSTS: Chapter 08 Interactive Demos
// ============================================================================
// Wire the book's snippets into interactive demos without modifying the
// snippet code itself. The routed snippets are mounted for real at
// /chapter-08/router-demo (see router-demo.routes.ts).
// ============================================================================
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './router-guards/auth.service';
import { NavigationService } from './router-lifecycle/navigation.service';

@Component({
  selector: 'app-ch8-simple-routes-demo',
  imports: [RouterLink],
  template: `
    <p>
      The book's <code>routes</code> array (home, about, empty-path redirect) is mounted for
      real under <code>/chapter-08/router-demo/basic</code>:
    </p>
    <p>
      <a routerLink="/chapter-08/router-demo/basic/home">Open /home</a> ·
      <a routerLink="/chapter-08/router-demo/basic/about">Open /about</a>
    </p>
    <p class="note">
      The array's <code>&#123; path: '', redirectTo: '/home' &#125;</code> entry uses an absolute
      path targeting the book app's root, so in this demo the two direct links above are used.
    </p>
  `,
  styles: `.note { color: #5a5f7d; font-size: 13px; }`,
})
export class Ch8SimpleRoutesDemo {}

@Component({
  selector: 'app-ch8-route-config-demo',
  imports: [RouterLink],
  template: `
    <p>
      The per-property examples (<code>path</code>, <code>component</code>,
      <code>children</code>, <code>redirectTo</code>, <code>pathMatch</code>) live verbatim in
      <code>route-configuration/core-route-properties.ts</code>, and the complete
      "Putting it all together" bootstrap (with <code>withInMemoryScrolling</code>) is kept
      verbatim in <code>route-configuration/main.ts</code> — intentionally never imported, since
      the real app bootstraps from <code>src/main.ts</code>.
    </p>
    <p>
      The wildcard (<code>'**'</code>) fallback behaviour is observable in the playground:
      <a routerLink="/chapter-08/router-demo/this-route-does-not-exist">visit an unknown URL</a>
      to hit the 404 component.
    </p>
  `,
})
export class Ch8RouteConfigDemo {}

@Component({
  selector: 'app-ch8-dynamic-routes-demo',
  imports: [RouterLink],
  template: `
    <p>Routed examples (each mounts the book's code):</p>
    <ul>
      <li>
        <a routerLink="/chapter-08/router-demo/dynamic/user/101">/user/101</a> — snapshot
        access (<code>UserDetailComponent</code>)
      </li>
      <li>
        <a routerLink="/chapter-08/router-demo/dynamic/product/angular-book">/product/angular-book</a>
        — slug parameter
      </li>
      <li>
        <a [routerLink]="['/chapter-08/router-demo/params', 7]" [queryParams]="{ term: 'signals' }">
          /params/7?term=signals
        </a>
        — <code>toSignal(route.paramMap / queryParamMap)</code>
      </li>
      <li>
        <a routerLink="/chapter-08/router-demo/live-user/1">/live-user/1</a> — long-lived
        <code>paramMap</code> subscription with <code>takeUntilDestroyed</code>
      </li>
    </ul>
    <p>
      Programmatic navigation (the book's snippets target the root paths '/user' and '/search'
      of its own app — see <code>dynamic-routes/navigation-snippets.ts</code>; these buttons
      perform the same navigations with the demo prefix):
    </p>
    <p>
      <button (click)="goToUser()">router.navigate(['…/user', user.id])</button>
      <button (click)="goToSearch()">
        router.navigate(['…/search'], &#123; queryParams: &#123; term: 'angular', page: 2 &#125; &#125;)
      </button>
    </p>
  `,
})
export class Ch8DynamicRoutesDemo {
  private router = inject(Router);
  user = { id: 101 };

  goToUser() {
    this.router.navigate(['/chapter-08/router-demo/dynamic/user', this.user.id]);
  }

  goToSearch() {
    this.router.navigate(['/chapter-08/router-demo/search'], { queryParams: { term: 'angular', page: 2 } });
  }
}

@Component({
  selector: 'app-ch8-guards-demo',
  imports: [RouterLink],
  template: `
    <p>
      Auth state: logged in = <code>{{ auth.loggedIn() }}</code>, role =
      <code>{{ auth.role() }}</code>
      <button (click)="auth.logIn('user')">Log in as user</button>
      <button (click)="auth.logIn('admin')">Log in as admin</button>
      <button (click)="auth.logOut()">Log out</button>
    </p>
    <ul>
      <li>
        <a routerLink="/chapter-08/router-demo/dashboard">CanActivate — /dashboard</a>:
        blocked (redirects to the demo login page) unless logged in.
      </li>
      <li>
        <a routerLink="/chapter-08/router-demo/edit/42">CanDeactivate — /edit/42</a>:
        edit the field, then try to navigate away with unsaved changes.
      </li>
      <li>
        <a routerLink="/chapter-08/router-demo/user/101">Resolve (typed ResolveFn) — /user/101</a>:
        data is prefetched (~0.7 s delay) before activation.
      </li>
      <li>
        <a routerLink="/chapter-08/router-demo/user-inline/102">Resolve (inline) — /user-inline/102</a>
      </li>
      <li>
        <a routerLink="/chapter-08/router-demo/user/0">Resolver failure — /user/0</a>:
        <code>catchError(() =&gt; of(null))</code> provides the safe fallback.
      </li>
      <li>
        <a routerLink="/chapter-08/router-demo/admin">CanMatch — /admin</a>:
        the lazy admin feature only matches (and loads) for the admin role.
      </li>
    </ul>
    <p class="note">
      The book's original route literals — with their root-level '/login' redirects — are kept
      verbatim in <code>router-guards/guards.routes.ts</code>.
    </p>
  `,
  styles: `.note { color: #5a5f7d; font-size: 13px; }`,
})
export class Ch8GuardsDemo {
  readonly auth = inject(AuthService);
}

@Component({
  selector: 'app-ch8-complex-routing-demo',
  imports: [RouterLink],
  template: `
    <ul>
      <li>
        Nested (child) routes:
        <a routerLink="/chapter-08/router-demo/settings/profile">/settings/profile</a> ·
        <a routerLink="/chapter-08/router-demo/settings/security">/settings/security</a>
      </li>
      <li>
        Auxiliary route (named outlet):
        <button (click)="openChat()">Open chat in the sidebar outlet</button>
        — renders <code>ChatComponent</code> next to the primary outlet in the playground.
      </li>
      <li>
        Feature-based routing: <a routerLink="/chapter-08/router-demo/admin">/admin</a>
        lazy-loads <code>ADMIN_ROUTES</code> via <code>loadChildren</code> (requires the admin
        role — see the guards demo).
      </li>
      <li>
        Route reuse: <a routerLink="/chapter-08/router-demo/reuse-demo/cached">cached</a> ·
        <a routerLink="/chapter-08/router-demo/reuse-demo/uncached">uncached</a> — type
        something, switch tabs, then come back. The cached tab keeps its text and creation
        time (opted in via <code>data: &#123; reuse: true &#125;</code>); the uncached tab
        resets every time (Angular's default behavior).
      </li>
    </ul>
    <p class="note">
      <code>CustomRouteReuseStrategy</code> lives in
      <code>route-reuse/custom-route-reuse.strategy.ts</code> and is registered app-wide in
      <code>app.config.ts</code> — safe everywhere else, since it's a no-op for any route
      without <code>data.reuse</code>.
    </p>
  `,
  styles: `.note { color: #5a5f7d; font-size: 13px; }`,
})
export class Ch8ComplexRoutingDemo {
  private router = inject(Router);

  // Absolute form of the book's outlets navigation, prefixed with
  // the demo mount point (see complex-routing/aux-navigation.ts).
  openChat() {
    this.router.navigate(['/chapter-08/router-demo', { outlets: { sidebar: ['chat'] } }]);
  }
}

@Component({
  selector: 'app-ch8-lifecycle-demo',
  imports: [RouterLink],
  template: `
    <p>
      The book's consolidated <code>NavigationService</code> is live:
      <code>loading()</code> = <code>{{ nav.loading() }}</code>.
      Every navigation logs analytics page views, and cancellations/failures raise
      notifications — watch the console panel at the top of this page.
    </p>
    <ul>
      <li>
        <a routerLink="/chapter-08/router-demo/user/101">Navigate through the delayed resolver</a>
        — the loading flag stays <code>true</code> for ~0.7 s.
      </li>
      <li>
        Log out (guards demo above) and open
        <a routerLink="/chapter-08/router-demo/dashboard">/dashboard</a> — the guard redirect
        completes as a normal navigation to the login page.
      </li>
    </ul>
    <p class="note">
      The RoutesRecognized / GuardsCheckStart / GuardsCheckEnd diagnostics snippet runs in the
      playground shell and logs via <code>console.debug</code> (browser devtools). The
      per-event mini fragments are kept verbatim in
      <code>router-lifecycle/lifecycle-snippets.ts</code>.
    </p>
  `,
  styles: `.note { color: #5a5f7d; font-size: 13px; }`,
})
export class Ch8LifecycleDemo {
  readonly nav = inject(NavigationService);
}
