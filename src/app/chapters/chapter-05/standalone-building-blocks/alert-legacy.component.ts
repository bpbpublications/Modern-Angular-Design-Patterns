import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-alert-legacy',
  template: `<div class="alert">{{ message }}</div>`
})
export class AlertLegacyComponent {
  @Input() message = '';
}
