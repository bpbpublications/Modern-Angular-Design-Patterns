import { Component } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-counter',
  template: `
    <h2>Counter: {{ count }}</h2>
    <button (click)="increment()">Increment</button>
  `
})
export class CounterComponent {
  count = 0;
  increment() {
    this.count++;
  }
}
