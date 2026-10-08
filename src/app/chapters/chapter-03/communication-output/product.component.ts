import { Component, input, output } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-product',
  template: `
    <div class="product-card">
      <h2>{{ product().name }}</h2>
      <p>Price: \${{ product().price }}</p>
      <button (click)="addToCart()">Add to Cart</button>
    </div>
  `
})
export class ProductComponent {
  product = input.required<{ name: string; price: number }>();
  productAdded = output<{ name: string; price: number }>();
  addToCart() {
    this.productAdded.emit(this.product());
  }
}
