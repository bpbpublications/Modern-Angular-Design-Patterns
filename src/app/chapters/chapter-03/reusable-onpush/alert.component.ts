import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="alert">{{ message() }}</div>`
})
export class AlertComponent {
  message = input.required<string>();
}
