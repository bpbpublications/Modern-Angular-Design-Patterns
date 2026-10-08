import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-alert',
  template: `<div class="alert">{{ message() }}</div>`
})
export class AlertComponent {
  message = input('');
}
