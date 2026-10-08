// product-card.component.ts
import { Component, inject, InjectionToken } from '@angular/core';

export interface ProductApi {
  getTitle(): string;
}

export const PRODUCT_API = new InjectionToken<ProductApi>('PRODUCT_API');

@Component({
  standalone: true,
  selector: 'app-product-card',
  template: `<h3 data-testid="title">{{ title }}</h3>`,
})
export class ProductCardComponent {
  private api = inject(PRODUCT_API);
  readonly title = this.api.getTitle();
}
