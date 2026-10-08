type PartialType<T> = {
  [K in keyof T]?: T[K];
};
export interface User {
  id: number;
  name: string;
  email: string;
}
export const partialUser: PartialType<User> = { name: 'Alice' };
// `id` and `email` are optional

type ReadonlyType<T> = {
  readonly [K in keyof T]: T[K];
};
export const user: ReadonlyType<User> = {id: 1, name: 'Alice', email: 'alice@example.com'};
// The next line is an intentional compile error, kept here as a comment:
// user.name = 'Bob';
// Error: Cannot assign to 'name' because it is a read-only property.
