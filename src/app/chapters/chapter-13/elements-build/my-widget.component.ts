// my-widget.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-widget',
  standalone: true,
  template: `
    <div class="widget">
      <h3>{{ title }}</h3>
      <button (click)="clicked.emit('ping')">Ping</button>
    </div>
  `
})
export class MyWidgetComponent {
  @Input() title = 'Widget';
  @Output() clicked = new EventEmitter<string>();
}
