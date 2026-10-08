import { Injectable } from '@angular/core';
import { ProductApi } from '../tokens';
import { Product } from '../product.model';

@Injectable()
export class RealProductApiService implements ProductApi {
  async getProduct(id: string): Promise<Product> {
    console.log(`RealProductApiService.getProduct('${id}') → fetching…`);
    return { id, name: `Real Product #${id}` };
  }
}
