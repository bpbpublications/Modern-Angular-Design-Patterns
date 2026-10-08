import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsFacade } from './products.facade';

// products.component.ts
@Component({
  standalone: true,
  selector: 'app-products',
  imports: [CommonModule],
  template: `
    <button (click)="facade.reload()">Reload</button>
    <ul>
      @for(p of (facade.products$ | async); track $index) { <li>{{ p.name }}</li> }
    </ul>
  `,
})
export class ProductsComponent {
  readonly facade = inject(ProductsFacade);
}
