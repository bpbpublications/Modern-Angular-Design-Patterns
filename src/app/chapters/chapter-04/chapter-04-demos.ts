// ============================================================================
// DEMO HOSTS: Chapter 04 Interactive Demos
// ============================================================================
// Wire the book's snippets into interactive demos without modifying the
// snippet code itself.
// ============================================================================
import { Component, inject } from '@angular/core';

import { OrderComponent as ServiceLayerOrderComponent } from './service-layer/order.component';
import { OrderComponent as DiOrderComponent } from './di-service-in-service/order.component';
import { ProductListComponent } from './di-http/product-list.component';
import { API_URL } from './injection-token/api-url.token';
import { LoginComponent } from './singleton/login.component';
import { AuthService } from './singleton/auth.service';
import { MenuComponent } from './iterator/menu.component';
import { MenuItem } from './iterator/menu-item';
import { PagesService } from './iterator-rxjs/pages.service';

@Component({
  selector: 'app-ch4-service-layer-demo',
  imports: [ServiceLayerOrderComponent],
  template: `
    <app-order />
    <p>
      <small>
        <code>OrderService.placeOrder()</code> is stubbed for this demo. 
        It logs the order and returns a static success response instead of making the HTTP call.
      </small>
    </p>
  `,
})
export class ServiceLayerDemo {}

@Component({
  selector: 'app-ch4-service-in-service-demo',
  imports: [DiOrderComponent],
  template: `<app-order />`,
})
export class ServiceInServiceDemo {}

@Component({
  selector: 'app-ch4-di-http-demo',
  imports: [ProductListComponent],
  template: `
    @if (show) {
      <app-product-list />
    } @else {
      <button (click)="show = true">Mount ProductListComponent (fetches fakestoreapi products)</button>
    }
  `,
})
export class DiHttpDemo {
  show = false;
}

@Component({
  selector: 'app-ch4-injection-token-demo',
  providers: [{ provide: API_URL, useValue: 'https://api.example.com' }],
  template: `
    <p>Injected <code>API_URL</code>: <code>{{ apiUrl }}</code></p>
    <button (click)="log()">console.log(inject(API_URL))</button>
  `,
})
export class InjectionTokenDemo {
  readonly apiUrl = inject(API_URL);

  log() {
    console.log('API_URL token resolved to:', this.apiUrl);
  }
}

@Component({
  selector: 'app-ch4-singleton-demo',
  imports: [LoginComponent],
  template: `
    <div class="row">
      <div>
        <p><strong>LoginComponent #1</strong></p>
        <app-login />
      </div>
      <div>
        <p><strong>LoginComponent #2</strong></p>
        <app-login />
      </div>
    </div>
    <button (click)="check()">AuthService.checkAuthStatus()</button>
    <p>
      <small>
        Both components share the same root-provided AuthService instance; each keeps its own
        local <code>isAuthenticated</code> copy, refreshed when its buttons are clicked.
      </small>
    </p>
  `,
  styles: `.row { display: flex; gap: 32px; }`,
})
export class SingletonDemo {
  private authService = inject(AuthService);

  check() {
    console.log('Singleton AuthService.checkAuthStatus() →', this.authService.checkAuthStatus());
  }
}

@Component({
  selector: 'app-ch4-iterator-demo',
  imports: [MenuComponent],
  template: `
    <p>The nested menu below is flattened by <code>MenuIteratorService.traverse()</code>:</p>
    <app-menu [menu]="menu" />
  `,
})
export class IteratorDemo {
  menu: MenuItem[] = [
    {
      id: 'file',
      label: 'File',
      children: [
        { id: 'new', label: 'New' },
        {
          id: 'open',
          label: 'Open',
          children: [{ id: 'recent', label: 'Recent Files' }],
        },
      ],
    },
    {
      id: 'edit',
      label: 'Edit',
      children: [{ id: 'undo', label: 'Undo' }],
    },
    { id: 'help', label: 'Help' },
  ];
}

@Component({
  selector: 'app-ch4-iterator-rxjs-demo',
  template: `<button (click)="load()">PagesService.loadPages() — expand over 3 pages</button>`,
})
export class IteratorRxjsDemo {
  private pagesService = inject(PagesService);

  load() {
    this.pagesService.loadPages().subscribe(items => {
      console.log('All pages loaded, accumulated items:', items);
    });
  }
}
