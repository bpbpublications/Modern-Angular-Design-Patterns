import { Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-button',
  imports: [NgClass],
  template: `<button [ngClass]="color()" (click)="handleClick()">{{ label() }}</button>`,
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  label = input<string>('Click Me');
  color = input<string>('primary');
  clicked = output<void>();
  handleClick() {
    this.clicked.emit();
  }
}
