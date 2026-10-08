import { Component } from '@angular/core';
import { CartComponent } from './components/cart.component';

@Component({
  standalone: true,
  selector: 'app-cart-page',
  imports: [CartComponent],
  template: `<app-cart />`,
})
export class CartPage {}
