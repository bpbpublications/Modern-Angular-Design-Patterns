import { Component, viewChild, effect } from '@angular/core';
import { CounterComponent } from './counter.component';
@Component({
  standalone: true,
  selector: 'app-counter-container',
  imports: [CounterComponent],
  template: `
    <app-counter></app-counter>
    <button (click)="incrementCounter()">Parent Increment</button>
  `,
  styles: [`button { margin-left: 8px; }`]
})
export class CounterContainerComponent {
  counterComponent = viewChild.required(CounterComponent);

  constructor() {
    effect(() => {
      const c = this.counterComponent();
      console.log('Counter Component:', c.count);
    });
  }

  incrementCounter() {
    this.counterComponent().increment();
  }
}
