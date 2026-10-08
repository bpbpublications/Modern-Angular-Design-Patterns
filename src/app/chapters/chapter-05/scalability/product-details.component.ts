import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product-details',
  template: `<p>Product Details — id: <code>{{ id ?? '(no :id route param — rendered outside the product/:id route)' }}</code></p>`,
})
export class ProductDetailsComponent {
  readonly id = inject(ActivatedRoute).snapshot.paramMap.get('id');
}
