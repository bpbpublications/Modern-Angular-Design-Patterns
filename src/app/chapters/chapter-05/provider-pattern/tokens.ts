// tokens.ts
import { InjectionToken } from '@angular/core';
import { Product } from './product.model';

export interface ProductApi {
  getProduct(id: string): Promise<Product>;
}

export const PRODUCT_API = new InjectionToken<ProductApi>('PRODUCT_API');
