import { Injectable, inject } from '@angular/core';
import { ProductService } from './product.service';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private productService = inject(ProductService);

  placeOrder() {
    console.log('Order placed for', this.productService.getProducts());
  }
}
