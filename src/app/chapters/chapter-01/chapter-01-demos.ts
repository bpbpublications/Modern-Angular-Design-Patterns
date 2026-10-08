// ============================================================================
// DEMO HOSTS: Chapter 01 Interactive Demos
// ============================================================================
// Wire the book's snippets into interactive demos without modifying the
// snippet code itself.
// ============================================================================
import { Component, Injector, inject, runInInjectionContext, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AppComponent } from './startup/app.component';
import { BooksComponent } from './startup/books.component';
import { ProductsComponent } from './patterns-intro/products.component';
import { AuthService } from './singleton/auth.service';
import { UserComponent as SrpUserComponent } from './solid/srp/user.component';
import { Notifier } from './solid/ocp/notifier';
import { EmailNotifierService } from './solid/ocp/email-notifier.service';
import { SmsNotifierService } from './solid/ocp/sms-notifier.service';
import { AlertComponent } from './solid/ocp/alert.component';
import { FlyingBird, SwimmingBird, moveBird } from './solid/lsp/birds';
import { Human, Robot } from './solid/isp/workers';
import { UserComponent as DipUserComponent } from './solid/dip/user.component';
import { UserComponent as FacadeUserComponent } from './facade/user.component';
import { NotificationFactory } from './factory/notification';
import { UserComponent as TestabilityUserComponent } from './testability/user.component';
import { NotificationService } from './observer/notification.service';
import { UserComponent as MvvmUserComponent } from './mvvm/user.component';

@Component({
  selector: 'app-ch1-startup-demo',
  imports: [AppComponent],
  template: `<app-root />`,
})
export class StartupDemo {}

@Component({
  selector: 'app-ch1-signals-demo',
  imports: [BooksComponent],
  template: `<app-books />`,
})
export class SignalsDemo {}

@Component({
  selector: 'app-ch1-facade-intro-demo',
  imports: [ProductsComponent],
  template: `<app-products />`,
})
export class FacadeIntroDemo {}

@Component({
  selector: 'app-ch1-singleton-demo',
  template: `
    <p>
      Current token: <code>{{ token() ?? 'null' }}</code>
    </p>
    <button (click)="login()">setToken('secret-jwt')</button>
    <button (click)="read()">getToken()</button>
  `,
})
export class SingletonDemo {
  private auth = inject(AuthService);
  readonly token = signal<string | null>(this.auth.getToken());

  login() {
    this.auth.setToken('secret-jwt');
    this.token.set(this.auth.getToken());
  }

  read() {
    this.token.set(this.auth.getToken());
    console.log('AuthService.getToken() →', this.auth.getToken());
  }
}

@Component({
  selector: 'app-ch1-srp-demo',
  imports: [SrpUserComponent, FormsModule],
  template: `
    <p>
      Edit the input passed to <code>UserComponent</code>:
      <label>name</label><input [(ngModel)]="name" /> <label>age</label><input type="number" [(ngModel)]="age" style="width: 70px" />
    </p>
    <app-user [user]="{ name: name, age: age }" />
  `,
})
export class SrpDemo {
  name = 'Ada Lovelace';
  age = 36;
}

@Component({
  selector: 'app-ch1-ocp-email-host',
  imports: [AlertComponent],
  providers: [{ provide: Notifier, useClass: EmailNotifierService }],
  template: `<app-alert />`,
})
export class OcpEmailHost {}

@Component({
  selector: 'app-ch1-ocp-sms-host',
  imports: [AlertComponent],
  providers: [{ provide: Notifier, useClass: SmsNotifierService }],
  template: `<app-alert />`,
})
export class OcpSmsHost {}

@Component({
  selector: 'app-ch1-ocp-demo',
  imports: [OcpEmailHost, OcpSmsHost],
  template: `
    <p>The same <code>AlertComponent</code>, provided with different <code>Notifier</code> implementations:</p>
    <div class="row">
      <span>Email channel: <app-ch1-ocp-email-host /></span>
      <span>SMS channel: <app-ch1-ocp-sms-host /></span>
    </div>
  `,
  styles: `.row { display: flex; gap: 24px; align-items: center; }`,
})
export class OcpDemo {}

@Component({
  selector: 'app-ch1-lsp-demo',
  template: `<button (click)="run()">Run moveBird(eagle) / moveBird(penguin)</button>`,
})
export class LspDemo {
  run() {
    const eagle = new FlyingBird();
    const penguin = new SwimmingBird();

    moveBird(eagle);   // Output: Flying
    moveBird(penguin); // Output: Swimming
  }
}

@Component({
  selector: 'app-ch1-isp-demo',
  template: `
    <button (click)="human()">new Human().work() + .eat()</button>
    <button (click)="robot()">new Robot().work()</button>
  `,
})
export class IspDemo {
  human() {
    const h = new Human();
    h.work();
    h.eat();
  }

  robot() {
    new Robot().work();
  }
}

@Component({
  selector: 'app-ch1-dip-demo',
  template: `<button (click)="run()">Instantiate UserComponent via DI and call getUser()</button>`,
})
export class DipDemo {
  private injector = inject(Injector);

  run() {
    const component = runInInjectionContext(this.injector, () => new DipUserComponent());
    component.getUser();
  }
}

@Component({
  selector: 'app-ch1-facade-demo',
  imports: [FacadeUserComponent],
  template: `<app-user />`,
})
export class FacadeDemo {}

@Component({
  selector: 'app-ch1-factory-demo',
  imports: [FormsModule],
  template: `
    <p>
      <select [(ngModel)]="type">
        <option value="email">email</option>
        <option value="sms">sms</option>
      </select>
      <input [(ngModel)]="message" placeholder="Message" />
      <button (click)="send()">NotificationFactory.createNotification(type).send(message)</button>
    </p>
  `,
})
export class FactoryDemo {
  type: 'email' | 'sms' = 'email';
  message = 'Your order has shipped!';

  send() {
    NotificationFactory.createNotification(this.type).send(this.message);
  }
}

@Component({
  selector: 'app-ch1-testability-demo',
  imports: [TestabilityUserComponent],
  template: `
    <app-user />
    <p>
      In unit tests, <code>UserService</code> is swapped for <code>MockUserService</code> via
      <code>TestBed.configureTestingModule(&#123; providers: [&#123; provide: UserService, useClass: MockUserService &#125;] &#125;)</code>.
    </p>
  `,
})
export class TestabilityDemo {}

@Component({
  selector: 'app-ch1-observer-demo',
  imports: [AsyncPipe, FormsModule],
  template: `
    <p>
      <input [(ngModel)]="draft" placeholder="Message" />
      <button (click)="notifications.sendMessage(draft)">sendMessage()</button>
    </p>
    <p>Subscriber sees: <code>{{ notifications.message$ | async }}</code></p>
  `,
})
export class ObserverDemo {
  readonly notifications = inject(NotificationService);
  draft = 'Hello from the observer pattern';
}

@Component({
  selector: 'app-ch1-lazy-demo',
  imports: [RouterLink],
  template: `
    <p>
      The book's lazy routes are mounted at <code>/chapter-01/lazy-demo</code>. Open the network
      tab and watch the chunks load on demand:
    </p>
    <a routerLink="/chapter-01/lazy-demo">Open lazy Home</a> ·
    <a routerLink="/chapter-01/lazy-demo/dashboard">Open lazy Dashboard</a>
  `,
})
export class LazyDemo {}

@Component({
  selector: 'app-ch1-mvvm-demo',
  imports: [MvvmUserComponent],
  template: `<app-user />`,
})
export class MvvmDemo {}
