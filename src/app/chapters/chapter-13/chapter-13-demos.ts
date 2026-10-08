// ============================================================================
// DEMO HOSTS: Chapter 13 Interactive Demos
// ============================================================================
// Wire the book's snippets into interactive demos without modifying the
// snippet code itself. Custom elements are registered exactly once, guarded
// by module-level flags + customElements.get(), because
// customElements.define() throws on duplicate registration.
// ============================================================================
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EnvironmentInjector,
  Injector,
  createEnvironmentInjector,
  inject,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { UserCardComponent } from './elements/user-card.component';
import { AuthService } from './singleton/auth.service';
import { LoggingService } from './dynamic-di/shared/logging.service';
import { ConsoleLoggingService } from './dynamic-di/shared/console-logging.service';
import { setAppInjector, appInjector } from './dynamic-di/app-injector';
import { MyElementComponent } from './dynamic-di/my-element.component';
import { MyWidgetComponent } from './elements-build/my-widget.component';

// ---------------------------------------------------------------------------
// Angular Elements for custom web components
// ---------------------------------------------------------------------------

let userCardElementRegistered = false;

@Component({
  selector: 'app-ch13-user-card-element-demo',
  // The custom-element tag below is unknown to the Angular compiler.
  // CUSTOM_ELEMENTS_SCHEMA allows it to be used in the template without error.
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <!-- usage anywhere -->
    <user-card-element user='{"name":"Alice"}'></user-card-element>
    <p class="note">
      The attribute above delivers the JSON <em>string</em> to the input — HTML attributes
      are string-based, so <code>user().name</code> is <code>undefined</code> until the value
      is deserialized (exactly the caveat the book describes). Assign the property to pass a
      real object:
    </p>
    <button (click)="setUserProperty()">el.user = &#123; name: 'Alice' &#125;</button>
  `,
  styles: `
    user-card-element { display: block; min-height: 20px; background: #f4f5fb; border-radius: 8px; padding: 8px 12px; }
    .note { color: #5a5f7d; font-size: 13px; }
  `,
})
export class Ch13UserCardElementDemo {
  private hostRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    // Performs the book's elements/main.ts registration (createApplication →
    // createCustomElement → customElements.define) exactly once.
    if (!userCardElementRegistered && !customElements.get('user-card-element')) {
      userCardElementRegistered = true;
      (async () => {
        const app = await createApplication({ providers: [] });
        const el = createCustomElement(UserCardComponent, { injector: app.injector as Injector });
        customElements.define('user-card-element', el);
      })();
    }
  }

  setUserProperty() {
    const el = this.hostRef.nativeElement.querySelector('user-card-element') as HTMLElement & {
      user: { name: string };
    };
    el.user = { name: 'Alice' };
    console.log(
      "user-card-element.user = { name: 'Alice' } → property assignment delivers the object to the signal input"
    );
  }
}

// ---------------------------------------------------------------------------
// Managing shared logic across micro frontends — singleton services
// ---------------------------------------------------------------------------

@Component({
  selector: 'app-ch13-singleton-auth-demo',
  imports: [AsyncPipe],
  template: `
    <p>
      <button (click)="loginAlice()">login(&#123; name: 'Alice' &#125;)</button>
      <button (click)="loginBob()">login(&#123; name: 'Bob' &#125;)</button>
      <button (click)="logout()">logout()</button>
    </p>
    <div class="row">
      <div class="widget">
        <h4>Micro frontend A</h4>
        <p>getCurrentUser(): <code>{{ (currentUser$ | async)?.name ?? 'null' }}</code></p>
      </div>
      <div class="widget">
        <h4>Micro frontend B</h4>
        <p>getCurrentUser(): <code>{{ (currentUser$ | async)?.name ?? 'null' }}</code></p>
      </div>
    </div>
  `,
  styles: `
    .row { display: flex; gap: 16px; flex-wrap: wrap; }
    .widget { background: #f4f5fb; border-radius: 8px; padding: 4px 14px; }
    h4 { margin: 8px 0 4px; }
  `,
})
export class Ch13SingletonAuthDemo {
  readonly auth = inject(AuthService);
  readonly currentUser$ = this.auth.getCurrentUser();

  loginAlice() {
    console.log("AuthService.login({ name: 'Alice' }) — both consumers share the singleton's BehaviorSubject");
    this.auth.login({ name: 'Alice' });
  }

  loginBob() {
    console.log("AuthService.login({ name: 'Bob' })");
    this.auth.login({ name: 'Bob' });
  }

  logout() {
    console.log('AuthService.logout()');
    this.auth.logout();
  }
}

// ---------------------------------------------------------------------------
// Dynamic dependency injection for shared services
// ---------------------------------------------------------------------------

let myElementRegistered = false;

@Component({
  selector: 'app-ch13-dynamic-di-demo',
  // The custom-element tag below is unknown to the Angular compiler.
  // CUSTOM_ELEMENTS_SCHEMA allows it to be used in the template without error.
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <my-element></my-element>
    <p class="note">
      The element above was registered with the shell's shared injector
      (<code>createCustomElement(MyElementComponent, &#123; injector: appInjector() &#125;)</code>),
      so its LoggingService is the host-provided ConsoleLoggingService.
    </p>
    <p>
      Global injector via <code>window</code>:
      <button (click)="setupGlobalInjector()">Host app setup</button>
      <button (click)="retrieveFromGlobalInjector()">Micro frontend retrieves it</button>
    </p>
  `,
  styles: `.note { color: #5a5f7d; font-size: 13px; }`,
})
export class Ch13DynamicDiDemo {
  constructor() {
    const envInjector = inject(EnvironmentInjector);
    if (!myElementRegistered && !customElements.get('my-element')) {
      myElementRegistered = true;
      // Stands in for the book's dynamic-di/main.ts —
      // bootstrapApplication(...).then(appRef => setAppInjector(appRef.injector)).
      // The demo cannot re-bootstrap, so it derives a child environment injector from
      // the running app and registers the shared LoggingService on it.
      setAppInjector(
        createEnvironmentInjector(
          [{ provide: LoggingService, useClass: ConsoleLoggingService }],
          envInjector
        )
      );
      // The book's register-element.ts flow, executed exactly once:
      const el = createCustomElement(MyElementComponent, { injector: appInjector() });
      customElements.define('my-element', el);
    }
  }

  setupGlobalInjector() {
    // Host app setup (book's verbatim lines)
    (window as any).globalInjector = Injector.create({
      providers: [
        { provide: LoggingService, useClass: ConsoleLoggingService }
      ]
    });
    console.log('window.globalInjector created — LoggingService → ConsoleLoggingService');
  }

  retrieveFromGlobalInjector() {
    if (!(window as any).globalInjector) {
      console.warn('Run "Host app setup" first — window.globalInjector is not set.');
      return;
    }
    // Micro frontend retrieves it (book's verbatim lines)
    const injector = (window as any).globalInjector;
    const logger = injector.get(LoggingService);
    logger.log('Loaded micro frontend!');
  }
}

// ---------------------------------------------------------------------------
// Building and integrating micro frontends
// ---------------------------------------------------------------------------

let myWidgetRegistered = false;

@Component({
  selector: 'app-ch13-my-widget-demo',
  // The custom-element tag below is unknown to the Angular compiler.
  // CUSTOM_ELEMENTS_SCHEMA allows it to be used in the template without error.
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <my-widget title="Hello"></my-widget>
    <p class="note">
      Clicking <em>Ping</em> emits the <code>clicked</code> output as a DOM CustomEvent;
      the host listens with <code>addEventListener('clicked', ...)</code> exactly like the
      book's usage snippet and logs <code>e.detail</code>.
    </p>
  `,
  styles: `.note { color: #5a5f7d; font-size: 13px; }`,
})
export class Ch13MyWidgetDemo implements AfterViewInit {
  private hostRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    // Performs the book's elements-build/main.ts registration exactly once.
    if (!myWidgetRegistered && !customElements.get('my-widget')) {
      myWidgetRegistered = true;
      (async () => {
        const app = await createApplication({
          providers: [
            // shared services for the element (logging/auth/config), if any
          ]
        });
        const el = createCustomElement(MyWidgetComponent, { injector: app.injector });
        customElements.define('my-widget', el);
      })();
    }
  }

  ngAfterViewInit() {
    // Book's usage snippet, adapted from its inline <script> block:
    this.hostRef.nativeElement
      .querySelector('my-widget')!
      .addEventListener('clicked', (e) => console.log('Element says:', (e as CustomEvent).detail));
  }
}
