import { Component, input } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-product',
  template: `
    <div class="product-card">
      <h2>{{ product().name }}</h2>
      <p>Price: \${{ product().price }}</p>
    </div>
  `
})
export class ProductComponent {
  product = input.required<{ name: string; price: number }>();
}
