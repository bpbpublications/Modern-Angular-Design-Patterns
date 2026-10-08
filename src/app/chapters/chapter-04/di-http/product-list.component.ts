import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from './product.service';
@Component({
  standalone: true,
  selector: 'app-product-list',
  template: `
    <ul>
      @for (product of products; track product.id) {
        <li>{{ product.title }}</li>
      }
    </ul>  `
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  private productService = inject(ProductService);

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
}
