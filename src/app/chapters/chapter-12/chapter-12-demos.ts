// ============================================================================
// DEMO HOSTS: Chapter 12 Interactive Demos
// ============================================================================
// Wire the book's snippets into interactive demos without modifying the
// snippet code itself.
// ============================================================================
import { Component, Injectable, OnDestroy, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, delay, map, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { UserService } from './facade-api/user.service';
import { UserProfileComponent } from './facade-api/user-profile.component';
import { DashboardComponent } from './facade-multi/dashboard.component';
import { UiMediatorService } from './mediator/ui-mediator.service';
import { AppEventType, EventBusService } from './mediator/event-bus.service';
import { EmitterComponent } from './mediator/emitter.component';
import { VALIDATION_STRATEGY } from './strategy/validation-strategy.token';
import { FormValidatorService } from './strategy/form-validator.service';
import { EmailValidationStrategy } from './strategy/email-validation.strategy';
import { PhoneValidationStrategy } from './strategy/phone-validation.strategy';
import { UserContextService } from './strategy/user-context.service';
import { InlineEditStrategy, ModalEditStrategy } from './strategy/edit.strategies';
import { DynamicFormComponent } from './visitor/dynamic-form.component';
import { NotificationFacade } from './combined/notification.facade';
import { AppState } from './combined/app-state';
import { loadNotifications } from './combined/notification.actions';
import { TaskWidgetComponent } from './combined/task-widget.component';
import { NotificationCenterComponent } from './combined/notification-center.component';

// ---------------------------------------------------------------------------
// Facade pattern for API abstraction
// ---------------------------------------------------------------------------

// Supporting fake HttpClient: the book's UserService calls
// https://api.example.com/user, which does not exist. The demo host provides this
// stand-in for the HttpClient token so the verbatim UserService/UserProfileComponent
// code runs against a fabricated response.
@Injectable()
class FakeUserHttpClient {
  get<T>(url: string): Observable<T> {
    console.log(`GET ${url} → fabricated response (no real backend in the demo)`);
    return of({ name: 'Alice Johnson', email: 'alice@example.com' } as T).pipe(delay(800));
  }
}

@Component({
  selector: 'app-ch12-api-service-demo',
  imports: [UserProfileComponent],
  providers: [
    // Local UserService instance so it resolves the fake HttpClient below.
    UserService,
    { provide: HttpClient, useClass: FakeUserHttpClient },
  ],
  template: `
    <p><button (click)="reload()">Recreate UserProfileComponent (fetch again)</button></p>
    @if (visible()) {
      <app-user-profile />
    }
  `,
})
export class Ch12ApiServiceDemo {
  readonly visible = signal(true);

  reload() {
    this.visible.set(false);
    setTimeout(() => this.visible.set(true));
  }
}

@Component({
  selector: 'app-ch12-dashboard-host',
  imports: [DashboardComponent],
  template: `<app-dashboard />`,
})
export class Ch12DashboardHost {}

@Component({
  selector: 'app-ch12-facade-multi-demo',
  imports: [Ch12DashboardHost],
  template: `
    <p><button (click)="reload()">Re-create dashboards (metrics$ re-queries the services)</button></p>
    @if (visible()) {
      <p class="label">Template binds <code>facade.metrics$</code>:</p>
      <app-ch12-dashboard-host />
    }
  `,
  styles: `
    .row { display: flex; gap: 32px; flex-wrap: wrap; }
    .label { color: #5a5f7d; font-size: 13px; margin-bottom: 4px; }
  `,
})
export class Ch12FacadeMultiDemo {
  readonly visible = signal(true);

  reload() {
    this.visible.set(false);
    setTimeout(() => this.visible.set(true));
  }
}

// ---------------------------------------------------------------------------
// Mediator pattern for component communication
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-ch12-ui-mediator-demo',
  template: `
    <p><button (click)="complete()">notifyTaskCompleted()</button></p>
    <p>
      Decoupled subscriber received <strong>{{ received() }}</strong>
      <code>taskCompleted$</code> notification(s).
    </p>
  `,
})
export class Ch12UiMediatorDemo implements OnDestroy {
  private mediator = inject(UiMediatorService);
  readonly received = signal(0);

  private sub = this.mediator.taskCompleted$.subscribe(() => {
    this.received.update((n) => n + 1);
    console.log('UiMediatorService.taskCompleted$ → subscriber notified');
  });

  complete() {
    this.mediator.notifyTaskCompleted();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

@Component({
  selector: 'app-ch12-event-bus-demo',
  imports: [EmitterComponent],
  template: `
    <p><app-emitter /></p>
    <p>
      Host listener <code>on&lt;string&gt;(AppEventType.Navigate)</code> last received:
      <code>{{ lastPath() ?? '—' }}</code>
    </p>
    <p class="note">
      The book's ListenerComponent (<code>mediator/listener.component.ts</code>) calls
      <code>router.navigateByUrl(path)</code>; it is ported verbatim but not mounted so the
      demo stays on this page.
    </p>
  `,
  styles: `.note { color: #5a5f7d; font-size: 13px; }`,
})
export class Ch12EventBusDemo implements OnDestroy {
  private eventBus = inject(EventBusService);
  readonly lastPath = signal<string | null>(null);

  private sub = this.eventBus.on<string>(AppEventType.Navigate).subscribe((path) => {
    this.lastPath.set(path);
    console.log('EventBusService → NAVIGATE event received with payload:', path);
  });

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

// ---------------------------------------------------------------------------
// Strategy pattern in interaction contexts
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-ch12-email-strategy-host',
  imports: [ReactiveFormsModule],
  providers: [
    // Local FormValidatorService so its inject(VALIDATION_STRATEGY) resolves the
    // strategy provided on this host (mirrors the book's provider override guidance).
    FormValidatorService,
    { provide: VALIDATION_STRATEGY, useClass: EmailValidationStrategy },
  ],
  template: `
    <p class="label"><code>VALIDATION_STRATEGY → EmailValidationStrategy</code></p>
    <input [formControl]="emailControl" placeholder="email" />
    <button (click)="validate()">validateForm(form)</button>
    @if (result()) {
      <p>Result: <code>{{ result() }}</code></p>
    }
  `,
  styles: `.label { color: #5a5f7d; font-size: 13px; }`,
})
export class Ch12EmailStrategyHost {
  private validator = inject(FormValidatorService);
  readonly emailControl = new FormControl('not-an-email');
  readonly form = new FormGroup({ email: this.emailControl });
  readonly result = signal('');

  validate() {
    const errors = this.validator.validateForm(this.form);
    this.result.set(errors ? JSON.stringify(errors) : 'null (valid)');
    console.log(`EmailValidationStrategy.validate({ email: '${this.emailControl.value}' }) →`, errors);
  }
}

@Component({
  selector: 'app-ch12-phone-strategy-host',
  imports: [ReactiveFormsModule],
  providers: [
    FormValidatorService,
    { provide: VALIDATION_STRATEGY, useClass: PhoneValidationStrategy },
  ],
  template: `
    <p class="label"><code>VALIDATION_STRATEGY → PhoneValidationStrategy</code></p>
    <input [formControl]="phoneControl" placeholder="phone" />
    <button (click)="validate()">validateForm(form)</button>
    @if (result()) {
      <p>Result: <code>{{ result() }}</code></p>
    }
  `,
  styles: `.label { color: #5a5f7d; font-size: 13px; }`,
})
export class Ch12PhoneStrategyHost {
  private validator = inject(FormValidatorService);
  readonly phoneControl = new FormControl('12345');
  readonly form = new FormGroup({ phone: this.phoneControl });
  readonly result = signal('');

  validate() {
    const errors = this.validator.validateForm(this.form);
    this.result.set(errors ? JSON.stringify(errors) : 'null (valid)');
    console.log(`PhoneValidationStrategy.validate({ phone: '${this.phoneControl.value}' }) →`, errors);
  }
}

@Component({
  selector: 'app-ch12-validation-strategy-demo',
  imports: [Ch12EmailStrategyHost, Ch12PhoneStrategyHost],
  template: `
    <div class="row">
      <app-ch12-email-strategy-host />
      <app-ch12-phone-strategy-host />
    </div>
  `,
  styles: `.row { display: flex; gap: 32px; flex-wrap: wrap; }`,
})
export class Ch12ValidationStrategyDemo {}

@Component({
  selector: 'app-ch12-factory-strategy-host',
  providers: [
    // Mirrors the book's factory-provider main.ts snippet at the component level
    // (the demo cannot re-bootstrap the application).
    EmailValidationStrategy,
    PhoneValidationStrategy,
    FormValidatorService,
    {
      provide: VALIDATION_STRATEGY,
      useFactory: (
        userContext: UserContextService,
        emailStrategy: EmailValidationStrategy,
        phoneStrategy: PhoneValidationStrategy
      ) => {
        return userContext.prefersPhoneValidation() ? phoneStrategy : emailStrategy;
      },
      deps: [UserContextService, EmailValidationStrategy, PhoneValidationStrategy],
    },
  ],
  template: `
    <p>
      Factory resolved <code>VALIDATION_STRATEGY</code> →
      <strong>{{ strategyName }}</strong>
    </p>
  `,
})
export class Ch12FactoryStrategyHost {
  readonly strategyName =
    inject(VALIDATION_STRATEGY) instanceof PhoneValidationStrategy
      ? 'PhoneValidationStrategy'
      : 'EmailValidationStrategy';

  constructor() {
    console.log('Factory provider picked:', this.strategyName);
  }
}

@Component({
  selector: 'app-ch12-strategy-factory-demo',
  imports: [FormsModule, Ch12FactoryStrategyHost],
  template: `
    <p>
      <label>
        <input type="checkbox" [(ngModel)]="prefersPhone" />
        UserContextService.prefersPhoneValidation()
      </label>
      <button (click)="recreate()">Apply + re-create injector (factory re-runs)</button>
    </p>
    @if (mounted()) {
      <app-ch12-factory-strategy-host />
    }
  `,
})
export class Ch12StrategyFactoryDemo {
  private userContext = inject(UserContextService);
  prefersPhone = false;
  readonly mounted = signal(true);

  recreate() {
    this.userContext.setPrefersPhoneValidation(this.prefersPhone);
    this.mounted.set(false);
    setTimeout(() => this.mounted.set(true));
  }
}

@Component({
  selector: 'app-ch12-edit-strategy-demo',
  template: `
    <p>
      <button (click)="inlineEdit()">InlineEditStrategy.startEdit(item)</button>
      <button (click)="modalEdit()">ModalEditStrategy.startEdit(item)</button>
    </p>
    <p class="note">
      The book's strategy bodies are placeholder comments ("logic to edit in place" /
      "open modal for editing"); the host logs which interchangeable strategy ran.
    </p>
  `,
  styles: `.note { color: #5a5f7d; font-size: 13px; }`,
})
export class Ch12EditStrategyDemo {
  private inline = inject(InlineEditStrategy);
  private modal = inject(ModalEditStrategy);
  private readonly item = { id: 1, title: 'Quarterly report' };

  inlineEdit() {
    console.log('InlineEditStrategy.startEdit(item) — // logic to edit in place');
    this.inline.startEdit(this.item);
  }

  modalEdit() {
    console.log('ModalEditStrategy.startEdit(item) — // open modal for editing');
    this.modal.startEdit(this.item);
  }
}

// ---------------------------------------------------------------------------
// Use cases for Visitor pattern
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-ch12-visitor-demo',
  imports: [DynamicFormComponent, JsonPipe],
  template: `
    <app-dynamic-form (submitted)="onSubmit($event)" />
    @if (submitted(); as v) {
      <p>Submitted form value:</p>
      <pre>{{ v | json }}</pre>
    }
  `,
})
export class Ch12VisitorDemo {
  readonly submitted = signal<Record<string, unknown> | null>(null);

  onSubmit(value: Record<string, unknown>) {
    this.submitted.set(value);
    console.log('FormBuilderVisitor-built form submitted →', value);
  }
}

// ---------------------------------------------------------------------------
// Combining patterns for modular communication
// ---------------------------------------------------------------------------

// Supporting demo store: stands in for the NgRx Store the book's NotificationFacade
// selects from (the demo app does not register a global NgRx store, and provideStore()
// cannot be added at component level). It reduces the loadNotifications action into
// fabricated notifications so the verbatim facade/widget code runs unchanged.
@Injectable()
class DemoNotificationStore {
  private counter = 0;
  private readonly state = new BehaviorSubject<AppState>({ notifications: [] });

  select<R>(selector: (state: AppState) => R): Observable<R> {
    return this.state.pipe(map(selector));
  }

  dispatch(action: { type: string, message?: string}): void {
    if (action.type === loadNotifications.type) {
      this.counter += 1;
      console.log(`store.dispatch(loadNotifications()) → notification #${this.counter} added`);
      this.state.next({
        notifications: [
          ...this.state.value.notifications,
          {
            id: `n-${this.counter}`,
            message: `Notification #${this.counter} for ${action.message} — loaded at ${new Date().toLocaleTimeString()}`,
          },
        ],
      });
    }
  }
}

@Component({
  selector: 'app-ch12-combined-demo',
  imports: [TaskWidgetComponent, NotificationCenterComponent],
  providers: [
    // Local NotificationFacade so it resolves the stand-in store below.
    NotificationFacade,
    { provide: Store, useClass: DemoNotificationStore },
  ],
  template: `
    <div class="row">
      <app-task-widget />
      <app-notification-center />
    </div>
    <p class="note">
      Completing a task calls <code>UiMediatorService.notifyTaskCompleted()</code>; the
      Notification Center reacts by calling <code>NotificationFacade.loadNotifications()</code>,
      which the demo store reduces into a new notification.
    </p>
  `,
  styles: `
    .row { display: flex; gap: 32px; flex-wrap: wrap; align-items: flex-start; }
    .note { color: #5a5f7d; font-size: 13px; }
  `,
})
export class Ch12CombinedDemo {}
