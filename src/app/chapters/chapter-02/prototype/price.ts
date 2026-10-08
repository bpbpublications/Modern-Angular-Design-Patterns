export class Price {
  constructor(public readonly amount: number, public readonly currency: string) {}

  clone(): Price {
    return new Price(this.amount, this.currency);
  }
}
