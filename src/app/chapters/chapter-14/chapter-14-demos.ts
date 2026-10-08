// ============================================================================
// DEMO HOSTS: Chapter 14 Interactive Demos
// ============================================================================
// Wire the book's snippets into interactive demos without modifying the
// snippet code itself.
// ============================================================================
import { Component, Injector, OnDestroy, inject, signal } from '@angular/core';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthService } from './enterprise-app/auth.service';
import { EmployeeFacade } from './enterprise-app/employee.facade';
import { selectEmployeeError, selectEmployeeLoading } from './enterprise-app/employee.selectors';
import { EmployeeAdapter } from './enterprise-app/employee.adapter';
import { AccessStrategy } from './enterprise-app/access.strategy';
import {
  AdminAccessStrategy,
  EmployeeSelfServiceAccessStrategy,
  ManagerApprovalAccessStrategy,
} from './enterprise-app/role-access.strategies';
import { ProductFacade } from './patterns-in-practice/product.facade';
import { selectSelectedProduct } from './patterns-in-practice/product.selectors';
import { OrderAdapter } from './patterns-in-practice/order.adapter';
import { FormBuilderService } from './patterns-in-practice/form-builder.service';
import { FieldConfig } from './patterns-in-practice/field-config';
import { EmailValidation } from './patterns-in-practice/validation.strategy';
import { Notification, NotificationService } from './patterns-in-practice/notification.service';
import { UIEventMediator } from './patterns-in-practice/ui-event-mediator';
import { DashboardComponent } from './patterns-in-practice/dashboard.component';
import { setCurrentUser } from './patterns-in-practice/session.state';
import { UserApiService } from './testing-strategies/user-api.service';
import { GlobalAppErrorHandler } from './error-handling/global-app-error-handler';
import { LogEvent, redact } from './error-handling/logging';

// ---------------------------------------------------------------------------
// Building an enterprise Angular application
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-ch14-singleton-demo',
  template: `
    <button (click)="check()">Resolve AuthService twice and compare instances</button>
    @if (result() !== null) {
      <p>
        <code>injector.get(AuthService) === injector.get(AuthService)</code> →
        <strong>{{ result() }}</strong>
      </p>
    }
  `,
})
export class Ch14SingletonDemo {
  private injector = inject(Injector);
  readonly result = signal<boolean | null>(null);

  check() {
    const first = this.injector.get(AuthService);
    const second = this.injector.get(AuthService);
    this.result.set(first === second);
    console.log(
      "providedIn: 'root' — AuthService resolved twice, same instance:",
      first === second
    );
  }
}

@Component({
  selector: 'app-ch14-employee-facade-demo',
  imports: [AsyncPipe, DatePipe],
  template: `
    <p>
      <button (click)="load('e-1001')">loadProfile('e-1001')</button>
      <button (click)="load('e-1002')">loadProfile('e-1002')</button>
      <button (click)="load('e-1003')">loadProfile('e-1003') — malformed legacy payload</button>
      <button (click)="load('e-9999')">loadProfile('e-9999') — not found</button>
    </p>
    @if (loading$ | async) {
      <p>Loading…</p>
    }
    @if (error$ | async; as error) {
      <p class="error">Effect reported: {{ error }}</p>
    }
    @if (profile$ | async; as profile) {
      <p>
        Profile from the store: <code>{{ profile.id || '—' }}</code> · {{ profile.name }} ·
        {{ profile.role }} · joined
        {{ profile.joinedOn ? (profile.joinedOn | date: 'mediumDate') : 'n/a' }}
      </p>
    }
  `,
  styles: `.error { color: #c0392b; }`,
})
export class Ch14EmployeeFacadeDemo {
  private facade = inject(EmployeeFacade);
  private store = inject(Store);

  readonly profile$ = this.facade.getProfile();
  readonly loading$ = this.store.select(selectEmployeeLoading);
  readonly error$ = this.store.select(selectEmployeeError);

  load(id: string) {
    console.log(
      `EmployeeFacade.loadProfile('${id}') → dispatch → effect → GET /api/employees/${id} → EmployeeAdapter → store`
    );
    this.facade.loadProfile(id);
  }
}

@Component({
  selector: 'app-ch14-employee-adapter-demo',
  template: `
    <button (click)="clean()">adapt(clean payload)</button>
    <button (click)="malformed()">adapt(malformed payload) — defensive</button>
    @if (last()) {
      <pre>{{ last() }}</pre>
    }
  `,
  styles: `pre { background: #f4f5fb; padding: 10px; border-radius: 8px; }`,
})
export class Ch14EmployeeAdapterDemo {
  readonly last = signal('');

  private readonly cleanPayload = {
    emp_id: 'e-1001',
    full_name: 'Alice Johnson',
    job_title: 'HR Manager',
    start_date: '2019-03-18',
  };

  private readonly malformedPayload = { emp_id: 'e-1003', start_date: 'not-a-date' };

  clean() {
    const employee = new EmployeeAdapter().adapt(this.cleanPayload);
    this.show('EmployeeAdapter.adapt(clean)', employee);
  }

  malformed() {
    const employee = new EmployeeAdapter().adapt(this.malformedPayload);
    this.show('EmployeeAdapter.adapt(malformed) — safe fallbacks applied', employee);
  }

  private show(label: string, employee: unknown) {
    const text = JSON.stringify(employee, null, 2);
    this.last.set(text);
    console.log(`${label} →`, text);
  }
}

@Component({
  selector: 'app-ch14-access-strategy-demo',
  imports: [FormsModule],
  template: `
    <p>
      Runtime role:
      <select [(ngModel)]="role">
        <option value="guest">guest</option>
        <option value="employee">employee</option>
        <option value="manager">manager</option>
        <option value="admin">admin</option>
      </select>
    </p>
    <ul>
      @for (entry of strategies; track entry.label) {
        <li>
          <code>{{ entry.label }}.canActivate('{{ role }}')</code> →
          <strong>{{ entry.strategy.canActivate(role) }}</strong>
        </li>
      }
    </ul>
  `,
})
export class Ch14AccessStrategyDemo {
  role = 'employee';

  readonly strategies: { label: string; strategy: AccessStrategy }[] = [
    { label: 'AdminAccessStrategy', strategy: new AdminAccessStrategy() },
    { label: 'ManagerApprovalAccessStrategy', strategy: new ManagerApprovalAccessStrategy() },
    {
      label: 'EmployeeSelfServiceAccessStrategy',
      strategy: new EmployeeSelfServiceAccessStrategy(),
    },
  ];
}

// ---------------------------------------------------------------------------
// Applying modern design patterns in real projects
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-ch14-product-facade-demo',
  imports: [AsyncPipe],
  template: `
    <p>
      <button (click)="loadAll()">facade.loadAll()</button>
      @if (facade.loading$ | async) {
        <span> Loading…</span>
      }
    </p>
    <ul>
      @for (product of (facade.products$ | async) ?? []; track product.id) {
        <li>
          {{ product.name }} — \${{ product.price }}
          <button (click)="select(product.id)">selectProduct('{{ product.id }}')</button>
        </li>
      } @empty {
        <li>No products in the store yet.</li>
      }
    </ul>
    @if (selected$ | async; as selected) {
      <p>
        Selected product: <strong>{{ selected.name }}</strong>
      </p>
    }
  `,
})
export class Ch14ProductFacadeDemo {
  readonly facade = inject(ProductFacade);
  private store = inject(Store);
  readonly selected$ = this.store.select(selectSelectedProduct);

  loadAll() {
    console.log('ProductFacade.loadAll() → dispatch(loadProducts())');
    this.facade.loadAll();
  }

  select(id: string) {
    console.log(`ProductFacade.selectProduct('${id}') → dispatch(loadProductById({ id }))`);
    this.facade.selectProduct(id);
  }
}

@Component({
  selector: 'app-ch14-order-adapter-demo',
  template: `
    <p><code>apiOrder</code>: <code>{{ rawText }}</code></p>
    <button (click)="run()">OrderAdapter.adapt(apiOrder)</button>
    @if (result()) {
      <pre>{{ result() }}</pre>
    }
  `,
  styles: `pre { background: #f4f5fb; padding: 10px; border-radius: 8px; }`,
})
export class Ch14OrderAdapterDemo {
  private readonly apiOrder = {
    order_id: 'ord-042',
    client_name: 'Globex Corp',
    amount: '1499.99',
    order_date: '2026-05-14T10:30:00Z',
  };

  readonly rawText = JSON.stringify(this.apiOrder);
  readonly result = signal('');

  run() {
    const order = new OrderAdapter().adapt(this.apiOrder);
    this.result.set(JSON.stringify(order, null, 2));
    console.log('OrderAdapter.adapt(apiOrder) →', order);
  }
}

@Component({
  selector: 'app-ch14-form-builder-demo',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <p>Controls below are generated from JSON config by <code>FormBuilderService.createField()</code>:</p>
    <form [formGroup]="form">
      @for (config of configs; track config.name) {
        <p>
          <label>
            {{ config.name }} (<code>type: '{{ config.type }}'</code>)             
          </label>
          @if (config.type === 'select') {
            <select [formControlName]="config.name">
              @for (option of config.options; track option) {
                <option [value]="option">{{ option }}</option>
              }
            </select>
          } @else if (config.type === 'textarea') {
            <textarea [formControlName]="config.name"></textarea>
          } @else {
            <input [formControlName]="config.name" />
          }
        </p>
      }
    </form>
    <p>
      form.value: <code>{{ form.value | json }}</code> · form.valid:
      <code>{{ form.valid }}</code>
    </p>
  `,
})
export class Ch14FormBuilderDemo {
  private builder = inject(FormBuilderService);

  readonly configs: FieldConfig[] = [
    { name: 'fullName', type: 'text', options: [] },
    { name: 'department', type: 'select', options: ['HR', 'Engineering', 'Finance'] },
    { name: 'notes', type: 'textarea', options: [] },
  ];

  readonly form = new FormGroup(
    Object.fromEntries(
      this.configs.map((config) => [config.name, this.builder.createField(config)] as const)
    )
  );
}

@Component({
  selector: 'app-ch14-validation-strategy-demo',
  imports: [ReactiveFormsModule],
  template: `
    <p>
      <input [formControl]="control" placeholder="Enter an email" />
      <button (click)="validate()">EmailValidation.validate(control)</button>
    </p>
    @if (result()) {
      <p>Result: <code>{{ result() }}</code></p>
    }
  `,
})
export class Ch14ValidationStrategyDemo {
  private emailValidation = inject(EmailValidation);
  readonly control = new FormControl('hr-portal.example');
  readonly result = signal('');

  validate() {
    const errors = this.emailValidation.validate(this.control);
    this.result.set(errors ? JSON.stringify(errors) : 'null (valid)');
    console.log(`EmailValidation.validate('${this.control.value}') →`, errors);
  }
}

@Component({
  selector: 'app-ch14-notification-demo',
  imports: [FormsModule, DatePipe],
  template: `
    <p>
      <input [(ngModel)]="draft" placeholder="Message" />
      <button (click)="send()">notify(message)</button>
    </p>
    <ul>
      @for (notification of received(); track notification.timestamp) {
        <li>
          [{{ notification.timestamp | date: 'HH:mm:ss' }}] {{ notification.message }}
        </li>
      } @empty {
        <li>The <code>notifications$</code> subscriber has not received anything yet.</li>
      }
    </ul>
  `,
})
export class Ch14NotificationDemo implements OnDestroy {
  private service = inject(NotificationService);
  readonly received = signal<Notification[]>([]);
  draft = 'Policy update published';

  private sub = this.service.notifications$.subscribe((notification) => {
    this.received.update((list) => [...list, notification]);
    console.log('notifications$ subscriber received →', notification);
  });

  send() {
    this.service.notify(this.draft);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

@Component({
  selector: 'app-ch14-mediator-demo',
  template: `
    <p>
      <button (click)="toggle()">UIEventMediator.toggleSidebar({{ !sidebarOpen() }})</button>
    </p>
    <div class="layout">
      @if (sidebarOpen()) {
        <div class="sidebar">Sidebar (listens via onSidebarToggle())</div>
      }
      <div class="content">Main content</div>
    </div>
  `,
  styles: `
    .layout { display: flex; gap: 10px; }
    .sidebar { background: #e8ebfa; padding: 12px; border-radius: 8px; }
    .content { background: #f4f5fb; padding: 12px; border-radius: 8px; flex: 1; }
  `,
})
export class Ch14MediatorDemo implements OnDestroy {
  private mediator = inject(UIEventMediator);
  readonly sidebarOpen = signal(false);

  private sub = this.mediator.onSidebarToggle().subscribe((state) => {
    this.sidebarOpen.set(state);
    console.log('UIEventMediator → onSidebarToggle() received:', state);
  });

  toggle() {
    this.mediator.toggleSidebar(!this.sidebarOpen());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

@Component({
  selector: 'app-ch14-observer-dashboard-demo',
  imports: [DashboardComponent],
  template: `
    <p>
      <button (click)="login('Alice')">Set session user: Alice</button>
      <button (click)="login('Raj')">Set session user: Raj</button>
      <button (click)="logout()">Clear session</button>
    </p>
    <p>
      <code>&lt;app-dashboard /&gt;</code> observes <code>selectCurrentUser</code> through the
      async pipe:
    </p>
    <app-dashboard />
  `,
})
export class Ch14ObserverDashboardDemo {
  private store = inject(Store);

  login(name: string) {
    console.log(`dispatch(setCurrentUser({ user: { name: '${name}' } }))`);
    this.store.dispatch(setCurrentUser({ user: { name } }));
  }

  logout() {
    console.log('dispatch(setCurrentUser({ user: null }))');
    this.store.dispatch(setCurrentUser({ user: null }));
  }
}

// ---------------------------------------------------------------------------
// Testing strategies for pattern-driven Angular apps
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-ch14-unit-testing-demo',
  template: `
    <p>The book's test snippets are ported verbatim next to the code they exercise:</p>
    <ul>
      <li><code>testing-strategies/pricing-engine.spec.ts</code> — Strategy pattern without TestBed (Vitest)</li>
      <li><code>testing-strategies/user-builder.spec.ts</code> — Builder output and defaults</li>
      <li><code>testing-strategies/signals-totals.spec.ts</code> — Signal logic as plain TypeScript</li>
      <li><code>testing-strategies/debounce-search.spec.ts</code> — fakeAsync() + tick() for timers</li>
      <li><code>testing-strategies/user-api.service.spec.ts</code> — HTTP boundary with provideHttpClientTesting</li>
    </ul>
    <p>
      Run the seam the HTTP test asserts — <code>UserApiService.getUser('1')</code> maps
      <code>full_name</code> into the domain model:
    </p>
    <button (click)="run()">getUser('1')</button>
    @if (result()) {
      <p>Mapped domain model: <code>{{ result() }}</code></p>
    }
  `,
})
export class Ch14UnitTestingDemo {
  private api = inject(UserApiService);
  readonly result = signal('');

  async run() {
    console.log("UserApiService.getUser('1') → GET /api/users/1 (fabricated backend)");
    const user = await this.api.getUser('1');
    this.result.set(JSON.stringify(user));
    console.log('adapted response →', user);
  }
}

@Component({
  selector: 'app-ch14-e2e-demo',
  imports: [FormsModule],
  template: `
    <p>
      The Playwright journey in <code>e2e/critical-path.spec.ts</code> drives this mini UI —
      every interactive control carries the exact <code>data-testid</code> hook the test uses:
    </p>
    <button data-testid="nav-inventory" (click)="opened.set(true)">Inventory</button>
    @if (opened()) {
      <div class="panel">
        <button data-testid="btn-new-item" (click)="newItem()">New item</button>
        @if (creating()) {
          <p>
            <input data-testid="field-name" [(ngModel)]="name" placeholder="Item name" />
            <button data-testid="btn-save" (click)="save()">Save</button>
          </p>
        }
        @if (toast()) {
          <p data-testid="toast-success" class="toast">{{ toast() }}</p>
        }
        <ul data-testid="inventory-list">
          @for (item of items(); track $index) {
            <li>{{ item }}</li>
          } @empty {
            <li>Inventory is empty.</li>
          }
        </ul>
      </div>
    }
  `,
  styles: `
    .panel { background: #f4f5fb; padding: 12px; border-radius: 8px; margin-top: 8px; }
    .toast { color: #1d8348; font-weight: 600; }
  `,
})
export class Ch14E2eDemo {
  readonly opened = signal(false);
  readonly creating = signal(false);
  readonly toast = signal('');
  readonly items = signal<string[]>([]);
  name = '';

  newItem() {
    this.creating.set(true);
    this.toast.set('');
  }

  save() {
    if (!this.name) {
      return;
    }
    this.items.update((list) => [...list, this.name]);
    this.toast.set('Saved');
    console.log(`Inventory item saved: ${this.name}`);
    this.name = '';
    this.creating.set(false);
  }
}

// ---------------------------------------------------------------------------
// Error handling and logging strategies
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-ch14-error-interceptor-demo',
  template: `
    <p>
      Each request goes through <code>errorNormalizingInterceptor</code> (correlation ID +
      taxonomy) before the fabricated backend fails it:
    </p>
    <p>
      <button (click)="trigger(401)">GET /api/errors/401</button>
      <button (click)="trigger(422)">GET /api/errors/422</button>
      <button (click)="trigger(429)">GET /api/errors/429</button>
      <button (click)="trigger(503)">GET /api/errors/503</button>
      <button (click)="trigger(0)">GET /api/errors/0 (network)</button>
    </p>
    @if (lastError()) {
      <pre>{{ lastError() }}</pre>
    }
  `,
  styles: `pre { background: #f4f5fb; padding: 10px; border-radius: 8px; }`,
})
export class Ch14ErrorInterceptorDemo {
  private http = inject(HttpClient);
  readonly lastError = signal('');

  trigger(status: number) {
    const url = `/api/errors/${status}`;
    console.log(`GET ${url} (fabricated failure)`);
    this.http.get(url).subscribe({
      error: (err) => {
        this.lastError.set(JSON.stringify(err, null, 2));
        console.error('normalized AppError →', JSON.stringify(err));
      },
    });
  }
}

@Component({
  selector: 'app-ch14-error-handler-demo',
  template: `
    <button (click)="crash()">Throw + route to GlobalAppErrorHandler.handleError()</button>
    <p>
      The handler emits a structured <code>unhandled_exception</code> event through the
      <code>LOGGER</code> token (provided route-level) and mirrors the raw error to the console.
    </p>
  `,
})
export class Ch14ErrorHandlerDemo {
  private handler = inject(GlobalAppErrorHandler);

  crash() {
    try {
      throw new Error('Demo: unexpected failure inside a feature component');
    } catch (err) {
      this.handler.handleError(err);
    }
  }
}

@Component({
  selector: 'app-ch14-logging-demo',
  template: `
    <button (click)="run()">Build structured LogEvent with redact(meta)</button>
    @if (output()) {
      <pre>{{ output() }}</pre>
    }
  `,
  styles: `pre { background: #f4f5fb; padding: 10px; border-radius: 8px; }`,
})
export class Ch14LoggingDemo {
  readonly output = signal('');

  run() {
    const meta = {
      token: 'jwt-secret-value',
      password: 'hunter2',
      userAction: 'submitOrder',
      httpStatus: 503,
    };

    const logEvent: LogEvent = {
      level: 'error',
      event: 'checkout_submit_failed',
      correlationId: crypto.randomUUID(),
      route: '/chapter-14',
      feature: 'error-handling',
      meta: redact(meta),
    };

    this.output.set(JSON.stringify(logEvent, null, 2));
    console.log('structured log event (secrets redacted) →', JSON.stringify(logEvent));
  }
}
