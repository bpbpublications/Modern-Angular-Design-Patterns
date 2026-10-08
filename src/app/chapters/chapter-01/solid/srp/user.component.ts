import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `<h2>{{ user.name }} is {{ user.age }} years old</h2>`
})
export class UserComponent {
  @Input()
  user: {name: string, age: number};
  constructor() { }
}
