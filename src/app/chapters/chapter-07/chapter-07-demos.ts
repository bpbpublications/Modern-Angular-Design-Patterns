// ============================================================================
// DEMO HOSTS: Chapter 07 Interactive Demos
// ============================================================================
// Wire the book's snippets into interactive demos without modifying the
// snippet code itself. All NgRx-backed demos share the single 'cart' feature
// slice registered via CHAPTER_07_ROUTES — the same "single source of
// truth", observed from different cards.
// ============================================================================
import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';

import { CartService as ServiceBasedCartService } from './service-based/cart.service';
import { CartComponent as StoreCartComponent } from './components/cart.component';
import { CartComponent as FacadeCartComponent } from './components/cart-facade.component';
import { addItem, removeItem } from './actions/cart.actions';
import { selectCartItemCount } from './selectors/cart.selectors';
import { selectExpensiveItems } from './selectors/expensive-items.selectors';
import { CartFacade } from './facades/cart.facade';

@Component({
  selector: 'app-ch7-service-cart-demo',
  imports: [AsyncPipe, JsonPipe],
  template: `
    <p>
      <button (click)="addBook()">addItem(&#123; name: 'Angular Book', price: 3999 &#125;)</button>
      <button (click)="addMouse()">addItem(&#123; name: 'Wireless Mouse', price: 2999 &#125;)</button>
    </p>
    <pre>cart$ → {{ cart.cart$ | async | json }}</pre>
  `,
})
export class ServiceCartDemo {
  readonly cart = inject(ServiceBasedCartService);

  addBook() {
    this.cart.addItem({ name: 'Angular Book', price: 3999 });
  }

  addMouse() {
    this.cart.addItem({ name: 'Wireless Mouse', price: 2999 });
  }
}

@Component({
  selector: 'app-ch7-store-cart-demo',
  imports: [StoreCartComponent],
  template: `
    <p>
      <button (click)="dispatchAdd()">store.dispatch(addItem(&#123; item &#125;))</button>
      <button (click)="dispatchRemove()">store.dispatch(removeItem(&#123; itemId: 0 &#125;))</button>
    </p>
    <app-cart />
  `,
})
export class StoreCartDemo {
  private store = inject(Store);
  private samples = [
    { name: 'Coffee Beans', price: 1250 },
    { name: 'Espresso Cup', price: 899 },
    { name: 'Standing Desk', price: 54900 },
  ];
  private next = 0;

  dispatchAdd() {
    const item = this.samples[this.next++ % this.samples.length];
    this.store.dispatch(addItem({ item }));
  }

  dispatchRemove() {
    this.store.dispatch(removeItem({ itemId: 0 }));
  }
}

@Component({
  selector: 'app-ch7-effects-demo',
  template: `
    <button (click)="dispatch()">
      dispatch(addItem) → CartEffects → CartService API → addItemOk
    </button>
  `,
})
export class EffectsDemo {
  private store = inject(Store);

  dispatch() {
    console.log("dispatching addItem({ item: { name: 'Effect Item', price: 495 } })");
    this.store.dispatch(addItem({ item: { name: 'Effect Item', price: 495 } }));
  }
}

@Component({
  selector: 'app-ch7-selectors-demo',
  imports: [AsyncPipe, JsonPipe],
  template: `
    <p>selectCartItemCount → <code>{{ itemCount$ | async }}</code></p>
    <p>
      selectExpensiveItems (price &gt; 5000) →
      <code>{{ expensiveItems$ | async | json }}</code>
    </p>
    <button (click)="addCheap()">Add cheap item (price: 999)</button>
    <button (click)="addExpensive()">Add expensive item (price: 7999)</button>
  `,
})
export class SelectorsDemo {
  private store = inject(Store);
  readonly itemCount$ = this.store.select(selectCartItemCount);
  readonly expensiveItems$ = this.store.select(selectExpensiveItems);

  addCheap() {
    this.store.dispatch(addItem({ item: { name: 'Sticker Pack', price: 999 } }));
  }

  addExpensive() {
    this.store.dispatch(addItem({ item: { name: 'Mechanical Keyboard', price: 7999 } }));
  }
}

@Component({
  selector: 'app-ch7-facade-cart-demo',
  imports: [FacadeCartComponent],
  template: `
    <app-cart />
    <p><button (click)="removeFirst()">cartFacade.removeItem(0)</button></p>
  `,
})
export class FacadeCartDemo {
  private cartFacade = inject(CartFacade);

  removeFirst() {
    this.cartFacade.removeItem(0);
  }
}
