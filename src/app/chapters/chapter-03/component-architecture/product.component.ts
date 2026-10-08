import { Component } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-product',
  template: `<h2>{{ product.name }}</h2><p>Price: {{ product.price }}</p>`,
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  product = { name: 'Laptop', price: 1200 };
}
