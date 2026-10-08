import { Component } from '@angular/core';
import { ProductListComponent } from './product-list.component';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [ProductListComponent],
  template: `
    <h2>Shopping Cart</h2>
    <app-product-list></app-product-list>
  `
})
export class CartComponent {}
