// adapters/product.adapter.spec.ts
import { ProductAdapter } from './product.adapter';
import { ProductApi } from '../api/product.api';

describe('ProductAdapter', () => {
  it('maps API to domain and back', () => {
    const api: ProductApi = {
      product_id: 'p-123',
      product_name: 'Wireless Mouse',
      price_usd: '29.99',
      created_at: '2026-01-15T08:30:00.000Z',
    };
    const adapter = new ProductAdapter();

    const model = adapter.adapt(api);
    expect(model).toEqual({
      id: 'p-123',
      name: 'Wireless Mouse',
      price: 29.99,
      createdAt: new Date('2026-01-15T08:30:00.000Z'),
    });

    const back = adapter.toApi(model);
    expect(back).toEqual(api);
  });
});
