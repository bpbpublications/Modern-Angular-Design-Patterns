// ============================================================================
// DEMO HOSTS: Chapter 05 Interactive Demos
// ============================================================================
// Wire the book's snippets into interactive demos without modifying the
// snippet code itself.
// ============================================================================
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AlertComponent } from './standalone-building-blocks/alert.component';
import { AlertLegacyComponent } from './standalone-building-blocks/alert-legacy.component';
import { ProductPage } from './composing-features/product.page';
import { HighlightDirective } from './directives-and-pipes/highlight.directive';
import { TitleCaseStrictPipe } from './directives-and-pipes/titlecase-strict.pipe';
import { DashboardComponent } from './migration/dashboard/dashboard.component';
import { ADMIN_API, AdminHttpService } from './provider-scopes/admin-api';
import { AdminPage } from './provider-scopes/admin.page';
import { SettingsComponent } from './provider-scopes/settings.component';
import { PRODUCT_API } from './provider-pattern/tokens';
import { RealProductApiService } from './provider-pattern/services/real-product-api.service';
import { DemoPage } from './provider-pattern/demo.page';
import { provideUserFeature } from './provider-pattern/provide-user-feature';
import { UserService } from './provider-pattern/user-feature';
import { ProductDetailsComponent } from './scalability/product-details.component';
import { EditorStateService } from './scalability/editor-state.service';
import { EditorPage } from './scalability/editor.page';
import { PRODUCT_API as CARD_PRODUCT_API } from './testing/product-card.component';
import { ProductCardComponent } from './testing/product-card.component';
import { PROFILE_API, ProfileService } from './team-collaboration/profile-api';
import { ProfilePage } from './team-collaboration/profile.page';
import { routes as billingRoutes } from './team-collaboration/billing-routes';
import { BillingPage } from './team-collaboration/billing.page';

@Component({
  selector: 'app-ch5-standalone-blocks-demo',
  imports: [AlertComponent, AlertLegacyComponent, FormsModule],
  template: `
    <p>
      Message passed to both components: <input [(ngModel)]="message" />
    </p>
    <p><code>AlertComponent</code> (signal-based <code>input()</code>):</p>
    <app-alert [message]="message" />
    <p><code>AlertLegacyComponent</code> (decorator-based <code>&#64;Input()</code>):</p>
    <app-alert-legacy [message]="message" />
  `,
})
export class StandaloneBlocksDemo {
  message = 'Something happened!';
}

@Component({
  selector: 'app-ch5-composing-features-demo',
  imports: [ProductPage],
  template: `
    <app-product-page />
    <p>
      <small>
        The book routes to this page lazily via <code>loadComponent</code>; that routes snippet
        lives in <code>composing-features/routes.ts</code> (reference only).
      </small>
    </p>
  `,
})
export class ComposingFeaturesDemo {}

@Component({
  selector: 'app-ch5-directives-pipes-demo',
  imports: [HighlightDirective, TitleCaseStrictPipe, FormsModule],
  template: `
    <p appHighlight>Hover me — HighlightDirective (default yellow).</p>
    <p appHighlight [color]="'#a5d6ff'">Hover me — HighlightDirective with [color]="'#a5d6ff'".</p>
    <p>
      <input [(ngModel)]="text" />
      → <code>{{ text | titlecaseStrict }}</code> (titlecaseStrict pipe)
    </p>
  `,
})
export class DirectivesPipesDemo {
  text = 'modern angular design patterns';
}

@Component({
  selector: 'app-ch5-migration-demo',
  imports: [DashboardComponent],
  template: `
    <app-dashboard />
    <p>
      <small>
        The standalone <code>DashboardComponent</code> imports
        <code>SomeSharedDirective</code> directly (hover the paragraph). The accompanying
        migration snippets — <code>bootstrapApplication</code> in <code>migration/main.ts</code>,
        the <code>loadComponent</code> route in <code>migration/dashboard-routes.ts</code>, and
        the CoreModule replacement in <code>migration/core-providers.main.ts</code> — are kept
        verbatim as reference files that never execute.
      </small>
    </p>
  `,
})
export class MigrationDemo {}

@Component({
  selector: 'app-ch5-admin-scope-host',
  imports: [AdminPage],
  providers: [{ provide: ADMIN_API, useClass: AdminHttpService }],
  template: `<app-admin-page />`,
})
export class AdminScopeHost {}

@Component({
  selector: 'app-ch5-provider-scopes-demo',
  imports: [AdminScopeHost, SettingsComponent],
  template: `
    <p>
      <strong>Application scope</strong> — the book's <code>main.ts</code> snippet providing
      <code>API_BASE_URL</code> lives in <code>provider-scopes/app-level.main.ts</code>
      (reference only).
    </p>
    <p>
      <strong>Route scope</strong> — the book provides <code>ADMIN_API</code> via
      <code>useClass: AdminHttpService</code> on the admin route
      (<code>provider-scopes/admin-routes.ts</code>); here the same provider is applied to a host:
    </p>
    @if (showAdmin) {
      <app-ch5-admin-scope-host />
    } @else {
      <button (click)="showAdmin = true">Activate admin scope (creates AdminHttpService)</button>
    }
    <p>
      <strong>Component scope</strong> — <code>SettingsComponent</code> registers
      <code>SettingsAdapterService</code> in its own <code>providers</code>; each mounted instance
      logs a fresh service instance:
    </p>
    <button (click)="settingsCount = settingsCount + 1">Mount another SettingsComponent</button>
    @for (i of counter(); track i) {
      <app-settings />
    }
  `,
})
export class ProviderScopesDemo {
  showAdmin = false;
  settingsCount = 0;

  counter(): number[] {
    return Array.from({ length: this.settingsCount }, (_, i) => i);
  }
}

@Component({
  selector: 'app-ch5-provider-pattern-real-host',
  imports: [DemoPage],
  providers: [{ provide: PRODUCT_API, useClass: RealProductApiService }],
  template: `<app-provider-demo-page />`,
})
export class ProviderPatternRealHost {}

@Component({
  selector: 'app-ch5-provider-pattern-override-host',
  imports: [DemoPage],
  providers: [
    {
      provide: PRODUCT_API,
      useValue: { getProduct: async () => ({ id: '1', name: 'Demo Product' }) }
    }
  ],
  template: `<app-provider-demo-page />`,
})
export class ProviderPatternOverrideHost {}

@Component({
  selector: 'app-ch5-provider-pattern-demo',
  imports: [ProviderPatternRealHost, ProviderPatternOverrideHost],
  template: `
    <p><code>PRODUCT_API</code> → <code>useClass: RealProductApiService</code> (app-scope snippet):</p>
    <app-ch5-provider-pattern-real-host />
    <p><code>PRODUCT_API</code> → the book's route-level <code>useValue</code> override:</p>
    <app-ch5-provider-pattern-override-host />
  `,
})
export class ProviderPatternDemo {}

@Component({
  selector: 'app-ch5-shared-functionality-demo',
  providers: [...provideUserFeature()],
  template: `
    <p>
      This host registers <code>...provideUserFeature()</code> in its providers — the same
      grouped providers the book spreads into <code>bootstrapApplication</code>
      (<code>provider-pattern/user-feature.main.ts</code>, reference only).
    </p>
    <button (click)="load()">UserService.loadUser()</button>
    <span> → <code>{{ result }}</code></span>
  `,
})
export class SharedFunctionalityDemo {
  private userService = inject(UserService);
  result = '(not loaded yet)';

  load() {
    this.result = JSON.stringify(this.userService.loadUser());
  }
}

@Component({
  selector: 'app-ch5-lazy-loading-demo',
  imports: [ProductDetailsComponent],
  template: `
    <p>
      The book's parameterized lazy route (<code>product/:id</code> →
      <code>loadComponent</code>) lives in <code>scalability/product-details-routes.ts</code>
      (reference only); the leaf component it loads renders below:
    </p>
    <app-product-details />
  `,
})
export class LazyLoadingDemo {}

@Component({
  selector: 'app-ch5-editor-scope-host',
  imports: [EditorPage],
  providers: [EditorStateService],
  template: `<app-editor-page />`,
})
export class EditorScopeHost {}

@Component({
  selector: 'app-ch5-route-scoped-providers-demo',
  imports: [EditorScopeHost],
  template: `
    <p>
      The book scopes <code>EditorStateService</code> to the editor route
      (<code>scalability/editor-route.ts</code>); here the same provider is applied to a host you
      can activate and deactivate — watch the create/destroy logs:
    </p>
    <button (click)="active = !active">{{ active ? 'Deactivate' : 'Activate' }} editor scope</button>
    @if (active) {
      <app-ch5-editor-scope-host />
    }
  `,
})
export class RouteScopedProvidersDemo {
  active = false;
}

@Component({
  selector: 'app-ch5-testing-demo',
  imports: [ProductCardComponent],
  providers: [{ provide: CARD_PRODUCT_API, useValue: { getTitle: () => 'Angular T-shirt' } }],
  template: `
    <app-product-card />
    <p>
      <small>
        In the unit test (<code>testing/product-card.component.spec.ts</code>), the standalone
        component is imported directly into TestBed and <code>PRODUCT_API</code> is swapped via
        <code>overrideProvider(PRODUCT_API, &#123; useValue: mockProductApi &#125;)</code> —
        no fake NgModules needed.
      </small>
    </p>
  `,
})
export class TestingDemo {}

@Component({
  selector: 'app-ch5-profile-providers-host',
  imports: [ProfilePage],
  providers: [{ provide: PROFILE_API, useClass: ProfileService }],
  template: `<app-profile-page />`,
})
export class ProfileProvidersHost {}

@Component({
  selector: 'app-ch5-team-collaboration-demo',
  imports: [ProfileProvidersHost],
  template: `
    <p>
      The book binds <code>PROFILE_API</code> to <code>ProfileService</code> on the profile route
      (<code>team-collaboration/profile-route.ts</code>); the same provider is applied to this host:
    </p>
    <app-ch5-profile-providers-host />
  `,
})
export class TeamCollaborationDemo {}

@Component({
  selector: 'app-ch5-routing-ownership-demo',
  imports: [BillingPage],
  template: `
    <app-billing-page />
    <p>
      The billing route's <code>data</code> metadata (read from the book's
      <code>team-collaboration/billing-routes.ts</code>): owner =
      <code>{{ owner }}</code>
    </p>
  `,
})
export class RoutingOwnershipDemo {
  readonly owner = String(billingRoutes[0].data?.['owner']);
}
