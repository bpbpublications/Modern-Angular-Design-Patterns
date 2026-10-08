import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProductById, loadProducts } from './product.actions';
import { selectAllProducts, selectProductLoading } from './product.selectors';

@Injectable({ providedIn: 'root' })
export class ProductFacade {
  private store = inject(Store);

  products$ = this.store.select(selectAllProducts);
  loading$ = this.store.select(selectProductLoading);

  loadAll() {
    this.store.dispatch(loadProducts());
  }

  selectProduct(id: string) {
    this.store.dispatch(loadProductById({ id }));
  }
}
