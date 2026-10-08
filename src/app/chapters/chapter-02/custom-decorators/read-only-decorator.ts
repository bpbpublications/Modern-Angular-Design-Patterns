function ReadOnly(target: any, key: string) {
  // Symbol() creates a unique key that can't collide with `username` (or any
  // other property), even though the backing value lives on the same
  // instance. A plain string like '_username' would work too, but a Symbol
  // guarantees uniqueness and is skipped by Object.keys()/for...in, so it
  // doesn't show up as an ordinary enumerable property.
  const backingKey = Symbol(`__${key}`);
  Object.defineProperty(target, key, {
    get() {
      return this[backingKey];
    },
    set(newValue: string) {
      if (this[backingKey] === undefined) {
        this[backingKey] = newValue; // allow each instance's own constructor to set it once
      } else {
        throw new Error(`Cannot reassign read-only property: ${key}`);
      }
    },
    configurable: false,
    enumerable: true,
  });
}

export class Profile {
  @ReadOnly
  declare username: string;

  constructor() {
    this.username = 'JohnDoe';
  }
}
