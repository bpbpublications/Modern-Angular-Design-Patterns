import { Injectable, inject } from '@angular/core';
import { ProductsApi } from './products-api';

// products.facade.ts
@Injectable({ providedIn: 'root' })
export class ProductsFacade {
  private api = inject(ProductsApi);
  readonly products$ = this.api.getProducts();

  reload() {
    // could trigger refresh logic, caching, state updates, etc.
    return this.api.refresh();
  }
}
