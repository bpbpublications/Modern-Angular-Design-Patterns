import { Component } from '@angular/core';
import { ProductComponent } from './product.component';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [ProductComponent],
  template: `
    @for (item of products; track item.name) {
      <app-product [product]="item"></app-product>
    }
  `
})
export class ProductListComponent {
  products = [
    { name: 'Laptop', price: 1200 },
    { name: 'Phone', price: 800 }
  ];
}
