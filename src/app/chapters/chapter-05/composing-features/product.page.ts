import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-product-page',
  template: `
    <h2>Product Page</h2>
    <p>Selected Product: {{ product() }}</p>
  `
})
export class ProductPage {
  product = signal('Angular T-shirt');
}
