import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductService {
  getProducts(): string[] {
    return ['Laptop', 'Phone'];
  }
}
