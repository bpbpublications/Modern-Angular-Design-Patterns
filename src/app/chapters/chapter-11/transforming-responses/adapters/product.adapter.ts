import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductApi } from '../api/product.api';

@Injectable({ providedIn: 'root' })
export class ProductAdapter {
  adapt(api: ProductApi): Product {
    return {
      id: api.product_id,
      name: api.product_name,
      price: parseFloat(api.price_usd),
      createdAt: new Date(api.created_at),
    };
  }

  toApi(product: Product): ProductApi {
    return {
      product_id: product.id,
      product_name: product.name,
      price_usd: product.price.toFixed(2),
      created_at: product.createdAt.toISOString(),
    };
  }
}
