import { UserProfile } from './userProfile';

export class UserProfileBuilder {
  private age?: number;
  private name: string;

  setName(name: string) {
    this.name = name;
    return this;
  }
  setAge(age: number) {
    this.age = age;
    return this;
  }
  build(): UserProfile {
    return {name: this.name, age: this.age};
  }
}
