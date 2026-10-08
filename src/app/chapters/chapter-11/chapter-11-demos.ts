// ============================================================================
// DEMO HOSTS: Chapter 11 Interactive Demos
// ============================================================================
// Wire the book's snippets into interactive demos without modifying the
// snippet code itself.
// ============================================================================
import { Component, inject, signal } from '@angular/core';
import { DatePipe, JsonPipe } from '@angular/common';
import { HttpClient, HttpContext } from '@angular/common/http';

import { RawUserComponent } from './mismatched-formats/raw-user.component';
import { TransformedUserComponent } from './mismatched-formats/transformed-user.component';
import { User } from './model-adapter/models/user.model';
import { UsersService } from './model-adapter/data/users.service';
import { Product } from './transforming-responses/models/product.model';
import { ProductApi } from './transforming-responses/api/product.api';
import { ProductAdapter } from './transforming-responses/adapters/product.adapter';
import { SILENT_REQUEST } from './error-handling/shared/http-context-tokens';

@Component({
  selector: 'app-ch11-mismatch-demo',
  imports: [RawUserComponent, TransformedUserComponent],
  template: `
    <div class="row">
      <div class="cell">
        <p class="tag">Raw API response used directly</p>
        <app-ch11-raw-user />
      </div>
      <div class="cell">
        <p class="tag">After transformation</p>
        <app-ch11-transformed-user />
      </div>
    </div>
  `,
  styles: `
    .row { display: flex; gap: 24px; flex-wrap: wrap; }
    .cell { flex: 1; min-width: 220px; border: 1px dashed #d4d7e6; border-radius: 8px; padding: 8px 14px; }
    .tag { font-size: 12px; color: #5a5f7d; text-transform: uppercase; letter-spacing: 0.04em; }
  `,
})
export class MismatchDemo {}

@Component({
  selector: 'app-ch11-model-adapter-demo',
  imports: [DatePipe],
  providers: [
    // Local UsersService instance so it resolves the route-scoped HttpClient
    // (httpErrorInterceptor + fake backend), not the app-root one.
    UsersService,
  ],
  template: `
    <p>
      <button (click)="loadUser()">usersService.getUser(123)</button>
      <button (click)="loadUsers()">usersService.getUsers()</button>
      <button (click)="save()">usersService.saveUser(user)</button>
    </p>
    @if (user(); as u) {
      <p>
        Adapted user:
        <code>id={{ u.id }}, name="{{ u.name }}", createdAt={{ u.createdAt | date: 'medium' }}</code>
      </p>
    }
    @if (users().length) {
      <ul>
        @for (u of users(); track u.id) {
          <li>{{ u.name }} — created {{ u.createdAt | date }}</li>
        }
      </ul>
    }
  `,
})
export class ModelAdapterDemo {
  private usersService = inject(UsersService);

  readonly user = signal<User | null>(null);
  readonly users = signal<User[]>([]);

  loadUser() {
    this.usersService.getUser(123).subscribe((user) => {
      this.user.set(user);
      console.log('UserAdapter.adapt() →', {
        ...user,
        createdAt: user.createdAt.toISOString(),
      });
    });
  }

  loadUsers() {
    this.usersService.getUsers().subscribe((users) => {
      this.users.set(users);
      console.log(`UsersService.getUsers() adapted ${users.length} users`);
    });
  }

  save() {
    const user: User = { id: 123, name: 'Jane Doe', createdAt: new Date('2026-01-01T12:00:00Z') };
    this.usersService.saveUser(user).subscribe((response) => {
      console.log('POST /api/users — payload built by UserAdapter.toApi(), echoed by the fake backend:', response);
    });
  }
}

@Component({
  selector: 'app-ch11-product-adapter-demo',
  imports: [JsonPipe, DatePipe],
  template: `
    <p>Raw API response: <code>{{ api | json }}</code></p>
    <p>
      <button (click)="adapt()">productAdapter.adapt(api)</button>
      <button (click)="reverse()" [disabled]="!product()">productAdapter.toApi(product)</button>
    </p>
    @if (product(); as p) {
      <p>
        Domain model:
        <code>id="{{ p.id }}", name="{{ p.name }}", price={{ p.price }} (number), createdAt={{ p.createdAt | date: 'medium' }} (Date)</code>
      </p>
    }
    @if (roundTrip(); as back) {
      <p>Back to API shape: <code>{{ back | json }}</code></p>
    }
  `,
})
export class ProductAdapterDemo {
  private adapter = inject(ProductAdapter);

  readonly api: ProductApi = {
    product_id: 'p-123',
    product_name: 'Wireless Mouse',
    price_usd: '29.99',
    created_at: '2024-01-15T08:30:00.000Z',
  };

  readonly product = signal<Product | null>(null);
  readonly roundTrip = signal<ProductApi | null>(null);

  adapt() {
    const model = this.adapter.adapt(this.api);
    this.product.set(model);
    console.log('ProductAdapter.adapt() →', { ...model, createdAt: model.createdAt.toISOString() });
  }

  reverse() {
    const model = this.product();
    if (!model) return;
    const back = this.adapter.toApi(model);
    this.roundTrip.set(back);
    console.log('ProductAdapter.toApi() →', back);
  }
}

@Component({
  selector: 'app-ch11-error-handling-demo',
  template: `
    <p>
      Each button hits a fabricated failing endpoint; the request flows through the book's
      <code>httpErrorInterceptor</code>, which delegates to <code>ErrorHandlingService.handleError()</code>
      (watch the console panel for <code>API Error:</code>).
    </p>
    <p>
      <button (click)="trigger(0)">Network error (status 0)</button>
      <button (click)="trigger(401)">401 Unauthorized</button>
      <button (click)="trigger(500)">500 Server error</button>
      <button (click)="trigger(418)">418 Other</button>
    </p>
  `,
})
export class ErrorHandlingDemo {
  private http = inject(HttpClient);

  trigger(status: number) {
    // The error is already handled centrally by the interceptor; the empty error
    // callback just prevents an unhandled-rejection double report in the demo.
    this.http.get(`/api/demo/fail-${status}`).subscribe({ error: () => {} });
  }
}

@Component({
  selector: 'app-ch11-silent-request-demo',
  template: `
    <p>
      <button (click)="silentGet()">GET /api/products with SILENT_REQUEST</button>
      <button (click)="loudFailure()">Failing request (global handling)</button>
      <button (click)="silentFailure()">Failing request with SILENT_REQUEST</button>
    </p>
    <p>
      With <code>SILENT_REQUEST</code> set, the interceptor skips
      <code>ErrorHandlingService.handleError()</code> — no <code>API Error:</code> line appears.
    </p>
  `,
})
export class SilentRequestDemo {
  private http = inject(HttpClient);

  silentGet() {
    this.http.get<ProductApi>('/api/products', {
      context: new HttpContext().set(SILENT_REQUEST, true)
    }).subscribe((product) => console.log('Silent GET /api/products →', product));
  }

  loudFailure() {
    this.http.get('/api/demo/fail-500').subscribe({ error: () => {} });
  }

  silentFailure() {
    this.http
      .get('/api/demo/fail-500', {
        context: new HttpContext().set(SILENT_REQUEST, true),
      })
      .subscribe({
        error: (err) =>
          console.log(
            `Silent request failed with status ${err.status} — ErrorHandlingService was NOT invoked`
          ),
      });
  }
}
