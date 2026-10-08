// ============================================================================
// DEMO HOSTS: Chapter 09 Interactive Demos
// ============================================================================
// Wire the book's snippets into interactive demos without modifying the
// snippet code itself. The routed snippets are mounted for real at
// /chapter-09/lazy-demo (see lazy-demo.routes.ts).
// ============================================================================
import { Component, Type, inject, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { SelectivePreloadingStrategy } from './preloading/selective-preloading.strategy';
import { HeroComponent } from './images/hero.component';
import { ResponsiveImageComponent } from './images/responsive-image.component';
import { environment } from './feature-flags/environment';
import { FeatureService } from './feature-flags/feature.service';
import { ConditionalFeatureLoader } from './feature-flags/conditional-loading';

@Component({
  selector: 'app-ch9-lazy-pattern-demo',
  imports: [RouterLink],
  template: `
    <p>
      The book's route configuration lazy-loads <code>ADMIN_ROUTES</code> only when
      <code>/admin</code> is visited:
    </p>
    <p>
      <a routerLink="/chapter-09/lazy-demo/admin">Open the lazy admin feature</a>
    </p>
    <p class="note">
      Open the browser's network tab first — the admin chunk downloads on first navigation and
      is served from cache afterwards.
    </p>
  `,
  styles: `.note { color: #5a5f7d; font-size: 13px; }`,
})
export class Ch9LazyPatternDemo {}

@Component({
  selector: 'app-ch9-standalone-lazy-demo',
  imports: [RouterLink],
  template: `
    <p>
      The dashboard feature keeps its own <code>dashboard.routes.ts</code>
      (<code>DASHBOARD_ROUTES</code>), registered in the main routes via
      <code>loadChildren</code>; each page inside uses <code>loadComponent</code>:
    </p>
    <p>
      <a routerLink="/chapter-09/lazy-demo/dashboard">Open /dashboard</a> ·
      <a routerLink="/chapter-09/lazy-demo/dashboard/users">Open /dashboard/users</a>
    </p>
  `,
})
export class Ch9StandaloneLazyDemo {}

@Component({
  selector: 'app-ch9-preloading-demo',
  imports: [RouterLink],
  template: `
    <p>
      <code>withPreloading(PreloadAllModules)</code> and
      <code>withPreloading(SelectivePreloadingStrategy)</code> are bootstrap-level configuration
      — the book's <code>main.ts</code> is kept verbatim (never imported) in
      <code>preloading/main.ts</code>. The strategy's decision logic can still be exercised
      directly:
    </p>
    <p>
      <button (click)="runFlagged()">preload(route with data.preload = true)</button>
      <button (click)="runUnflagged()">preload(route without the flag)</button>
    </p>
    <p>
      The flagged route itself is mounted:
      <a routerLink="/chapter-09/lazy-demo/reports">open /reports</a> (loads lazily here, would
      be preloaded in the background with the strategy registered).
    </p>
  `,
})
export class Ch9PreloadingDemo {
  // Invokes the book's strategy directly with stand-in routes and
  // loaders so its route.data decision is observable in the console panel.
  private strategy = inject(SelectivePreloadingStrategy);

  runFlagged() {
    this.strategy
      .preload({ path: 'reports', data: { preload: true } }, () => of('reports chunk loaded'))
      .subscribe(result =>
        console.log(`SelectivePreloadingStrategy.preload('reports', data.preload=true) →`, result)
      );
  }

  runUnflagged() {
    this.strategy
      .preload({ path: 'admin' }, () => of('admin chunk loaded'))
      .subscribe(result =>
        console.log(`SelectivePreloadingStrategy.preload('admin', no flag) →`, result, '(skipped)')
      );
  }
}

@Component({
  selector: 'app-ch9-images-demo',
  imports: [HeroComponent, ResponsiveImageComponent],
  template: `
    <app-ch9-hero />
    <p class="note">
      Inspect the rendered <code>&lt;img&gt;</code> in devtools to see what
      <code>NgOptimizedImage</code> adds (<code>fetchpriority="high"</code> from
      <code>priority</code>, enforced width/height, eager loading).
    </p>
    <app-responsive-image />
    <p class="note">
      Responsive <code>ngSrc/ngSrcset/sizes</code> usage. A custom <code>IMAGE_LOADER</code>
      (see <code>images/responsive-image.component.ts</code>) maps <code>ngSrc</code> + width
      to this demo's <code>product[-width].jpg</code> asset naming, so
      <code>ngSrcset="300w, 600w"</code> only needs to list width descriptors.
    </p>
  `,
  styles: `
    img { max-width: 100%; height: auto; border: 1px dashed #c7cbe2; border-radius: 8px; }
    .note { color: #5a5f7d; font-size: 13px; }
  `,
})
export class Ch9ImagesDemo {}

@Component({
  selector: 'app-ch9-feature-flags-demo',
  imports: [RouterLink, NgComponentOutlet],
  template: `
    <p>
      <code>environment.features.enableBeta</code> = <code>{{ environment.features.enableBeta }}</code>
      <br>FeatureService flags:
      enableBeta = <code>{{ features.isFeatureEnabled('enableBeta') }}</code>,
      showReports = <code>{{ features.isFeatureEnabled('showReports') }}</code>
    </p>
    <p>
      <button (click)="toggle('enableBeta')">Toggle enableBeta</button>
      <button (click)="toggle('showReports')">Toggle showReports</button>
    </p>
    <ul>
      <li>
        Route-level gating: <a routerLink="/chapter-09/lazy-demo/beta">open /beta</a> — with
        the flag off, <code>canMatch</code> stops the route from matching and redirects to
        <code>/</code> without loading the chunk.
      </li>
      <li>
        Runtime import: <button (click)="loadReports()">loadReportsIfEnabled()</button>
        — dynamically imports and renders <code>ReportsComponent</code> only when
        <code>showReports</code> is enabled.
      </li>
    </ul>
    @if (reportsComponent(); as cmp) {
      <ng-container [ngComponentOutlet]="cmp" />
    }
  `,
})
export class Ch9FeatureFlagsDemo {
  readonly environment = environment;
  readonly features = inject(FeatureService);
  private loader = inject(ConditionalFeatureLoader);

  readonly reportsComponent = signal<Type<unknown> | null>(null);

  // Real FeatureService keeps its flags private and offers no setter, 
  // so for demo purpose only we flip them through a structural cast.
  toggle(flag: 'enableBeta' | 'showReports') {
    const flags = (this.features as unknown as { flags: Record<typeof flag, boolean> }).flags;
    flags[flag] = !flags[flag];
    console.log(`FeatureService: ${flag} → ${flags[flag]}`);
    if (flag === 'showReports' && !flags[flag]) {
      this.reportsComponent.set(null);
    }
  }

  // Runs the book's runtime-import snippet (see feature-flags/conditional-loading.ts), 
  // then performs the rendering the snippet's comment describes.
  async loadReports() {
    this.loader.loadReportsIfEnabled();
    if (this.features.isFeatureEnabled('showReports')) {
      const { ReportsComponent } = await import('./feature-flags/reports/reports.component');
      this.reportsComponent.set(ReportsComponent);
      console.log('ReportsComponent dynamically imported and rendered.');
    } else {
      console.warn(`showReports is disabled — the dynamic import was skipped.`);
    }
  }
}
