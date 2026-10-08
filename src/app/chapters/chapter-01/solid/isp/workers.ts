interface Workable {
  work(): void;
}
interface Eatable {
  eat(): void;
}
class Human implements Workable, Eatable {
  work() { console.log('Working'); }
  eat() { console.log('Eating'); }
}
class Robot implements Workable {
  work() { console.log('Working'); }
}

export type { Workable, Eatable };
export { Human, Robot };
