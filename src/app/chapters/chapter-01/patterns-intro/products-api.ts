import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  name: string;
}

const PRODUCTS: Product[] = [
  { name: 'Angular Handbook' },
  { name: 'RxJS Cookbook' },
  { name: 'NgRx in Practice' },
];

@Injectable({ providedIn: 'root' })
export class ProductsApi {
  private products = new BehaviorSubject<Product[]>(PRODUCTS);

  getProducts(): Observable<Product[]> {
    return this.products.asObservable();
  }

  refresh() {
    this.products.next([...PRODUCTS].sort(() => Math.random() - 0.5));
  }
}
