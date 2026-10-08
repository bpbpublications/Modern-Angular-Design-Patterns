export interface PaymentStrategy {
  pay(amount: number): void;
}
export class CreditCardPayment implements PaymentStrategy {
  pay(amount: number) {
    console.log(`Paid $${amount} using Credit Card.`);
  }
}
export class PayPalPayment implements PaymentStrategy {
  pay(amount: number) {
    console.log(`Paid $${amount} using PayPal.`);
  }
}
export class PaymentProcessor {
  constructor(private strategy: PaymentStrategy) {}
  executePayment(amount: number) {
    this.strategy.pay(amount);
  }
}
