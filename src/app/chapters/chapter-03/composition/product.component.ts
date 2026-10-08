import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-product',
  template: `
    <div class="product">
      <h2>{{ product().name }}</h2>
      @if (showPrice()) {
        <p>Price: {{ product().price }}</p>
      }
    </div>
  `,
})
export class ProductComponent {
  product = input.required<{ name: string; price: number }>();
  showPrice = input(true);
}
