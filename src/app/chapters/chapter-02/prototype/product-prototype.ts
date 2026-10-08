import { Price } from './price';

export class ProductPrototype {
  constructor(public readonly name: string, public readonly price: Price) { }

  clone(): ProductPrototype {
    return new ProductPrototype(this.name, this.price.clone());
  }
}
