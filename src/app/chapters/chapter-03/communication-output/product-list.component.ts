import { Component } from '@angular/core';
import { ProductComponent } from './product.component';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [ProductComponent],
  template: `
    @for (item of products; track item.name) {
      <app-product [product]="item" (productAdded)="onProductAdded($event)">
      </app-product>
    }
  `
})
export class ProductListComponent {
  products = [
    { name: 'Laptop', price: 1200 },
    { name: 'Phone', price: 800 }
  ];
  onProductAdded(product: { name: string; price: number }) {
    console.log('Added to cart:', product);
  }
}
