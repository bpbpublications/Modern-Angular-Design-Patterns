import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-ch8-product-page',
  template: `Product slug: {{ slug }}`,
})
export class ProductPageComponent {
  readonly slug = inject(ActivatedRoute).snapshot.paramMap.get('slug');
}
