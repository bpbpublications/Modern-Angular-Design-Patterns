import { Component, inject } from '@angular/core';
import { PRODUCT_API } from './tokens';

@Component({
  standalone: true,
  selector: 'app-provider-demo-page',
  template: `
    <button (click)="load()">PRODUCT_API.getProduct('1')</button>
    <span> → <code>{{ result }}</code></span>
  `,
})
export class DemoPage {
  private api = inject(PRODUCT_API);
  result = '(not loaded yet)';

  async load() {
    const product = await this.api.getProduct('1');
    this.result = JSON.stringify(product);
    console.log('PRODUCT_API.getProduct(\'1\') resolved →', product);
  }
}
