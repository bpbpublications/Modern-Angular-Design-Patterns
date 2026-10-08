import { describe, it, expect } from 'vitest';

interface PricingStrategy {
  price(base: number): number;
}

class RegularPricing implements PricingStrategy {
  price(base: number) { return base; }
}

class VipPricing implements PricingStrategy {
  price(base: number) { return base * 0.9; }
}

class PricingEngine {
  constructor(private readonly strategy: PricingStrategy) {}
  total(base: number) { return this.strategy.price(base); }
}

describe('PricingEngine (Strategy)', () => {
  it('uses VIP discount', () => {
    const engine = new PricingEngine(new VipPricing());
    expect(engine.total(100)).toBe(90);
  });
});
