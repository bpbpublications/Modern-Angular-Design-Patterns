// A lightweight contract for types that can clone themselves
export interface Cloneable<T> {
  clone(): T;
}

class User implements Cloneable<User> {
  constructor(public name: string, public email: string) {}
  clone(): User {
    return new User(this.name, this.email);
  }
}

export { User };
