// ============================================================================
// DEMO HOSTS: Chapter 03 Interactive Demos
// ============================================================================
// Wire the book's snippets into interactive demos without modifying the
// snippet code itself.
// ============================================================================
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProductComponent as BasicProductComponent } from './component-architecture/product.component';
import { ProductComponent as ComposedProductComponent } from './composition/product.component';
import { CartComponent } from './composition/cart.component';
import { ProductListComponent as InputProductListComponent } from './communication-input/product-list.component';
import { ProductListComponent as OutputProductListComponent } from './communication-output/product-list.component';
import { CounterContainerComponent } from './communication-viewchild/counter-container.component';
import { ButtonComponent } from './reusable-button/button.component';
import { AlertComponent } from './reusable-onpush/alert.component';
import { CardComponent } from './content-projection/card.component';
import { ModalComponent } from './content-projection/modal.component';
import { EmptyAwareComponent } from './content-projection/empty-aware.component';

@Component({
  selector: 'app-ch3-basic-component-demo',
  imports: [BasicProductComponent],
  template: `<app-product />`,
})
export class BasicComponentDemo {}

@Component({
  selector: 'app-ch3-composition-demo',
  imports: [CartComponent, ComposedProductComponent, FormsModule],
  template: `
    <app-cart />
    <hr />
    <p>
      The composable <code>ProductComponent</code> on its own — toggle its
      <code>showPrice</code> input:
      <label><input type="checkbox" [(ngModel)]="showPrice" /> showPrice</label>
    </p>
    <app-product [product]="{ name: 'Tablet', price: 450 }" [showPrice]="showPrice" />
  `,
})
export class CompositionDemo {
  showPrice = true;
}

@Component({
  selector: 'app-ch3-input-demo',
  imports: [InputProductListComponent],
  template: `<app-product-list />`,
})
export class InputDemo {}

@Component({
  selector: 'app-ch3-output-demo',
  imports: [OutputProductListComponent],
  template: `<app-product-list />`,
})
export class OutputDemo {}

@Component({
  selector: 'app-ch3-viewchild-demo',
  imports: [CounterContainerComponent],
  template: `<app-counter-container />`,
})
export class ViewChildDemo {}

@Component({
  selector: 'app-ch3-button-demo',
  imports: [ButtonComponent],
  template: `
    <app-button label="Submit" color="success" (clicked)="onSubmit()"></app-button>
    <app-button label="Cancel" color="danger" (clicked)="onCancel()"></app-button>
  `,
  styles: `app-button + app-button { margin-left: 8px; }`,
})
export class ButtonDemo {
  onSubmit() {
    console.log('ButtonComponent clicked → onSubmit()');
  }

  onCancel() {
    console.log('ButtonComponent clicked → onCancel()');
  }
}

@Component({
  selector: 'app-ch3-onpush-alert-demo',
  imports: [AlertComponent, FormsModule],
  template: `
    <p><input [(ngModel)]="message" placeholder="Alert message" /></p>
    <app-alert [message]="message" />
  `,
})
export class OnPushAlertDemo {
  message = 'OnPush components re-render only when their inputs change.';
}

@Component({
  selector: 'app-ch3-card-projection-demo',
  imports: [CardComponent],
  template: `
    <app-card>
      <h2>Title</h2>
      <p>Description content here.</p>
    </app-card>
  `,
})
export class CardProjectionDemo {}

@Component({
  selector: 'app-ch3-modal-projection-demo',
  imports: [ModalComponent],
  template: `
    <app-modal>
      <header>Modal Title</header>
      <p class="main-content">Main content of the modal.</p>
      <div modal-footer>Close</div>
    </app-modal>
  `,
})
export class ModalProjectionDemo {}

@Component({
  selector: 'app-ch3-empty-aware-demo',
  imports: [EmptyAwareComponent],
  template: `
    <p>With projected content:</p>
    <app-empty-aware>
      <ng-template>
        <p>Some projected content</p>
      </ng-template>
    </app-empty-aware>
    <p>Without projected content:</p>
    <app-empty-aware />
    <p>
      <small>
        Note: <code>ContentChild(TemplateRef)</code> only matches 
        a projected <code>&lt;ng-template&gt;</code> — plain projected 
        elements are not detected.
      </small>
    </p>
  `,
})
export class EmptyAwareDemo {}
