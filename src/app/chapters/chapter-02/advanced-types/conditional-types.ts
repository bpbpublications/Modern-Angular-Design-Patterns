type Mode = 'sync' | 'async';
type Result<M extends Mode, T> = M extends 'async' ? Promise<T> : T;
export interface Command<M extends Mode, T> { execute(): Result<M, T>; }

export class AddToCartSync implements Command<'sync', number> {
  execute(): number { return 1; }
}

export class AddToCartAsync implements Command<'async', number> {
  async execute(): Promise<number> { return 1; }
}
