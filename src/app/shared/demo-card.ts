import { Component, input } from '@angular/core';

@Component({
  selector: 'app-demo-card',
  templateUrl: './demo-card.html',
  styleUrl: './demo-card.scss',
})
export class DemoCard {
  readonly title = input.required<string>();
  readonly description = input<string>('');
}
