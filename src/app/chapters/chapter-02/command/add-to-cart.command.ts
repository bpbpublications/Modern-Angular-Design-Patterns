import { Command } from './command';

export class AddToCartCommand implements Command {
  constructor(private product: string, private cart: string[]) {}
  execute() {
    this.cart.push(this.product);
    console.log(`${this.product} added to cart`);
  }
  undo() {
    this.cart.pop();
    console.log(`${this.product} removed from cart`);
  }
}
