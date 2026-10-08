// user-card.component.ts (standalone)
import { Component, input } from '@angular/core';

@Component({
  selector: 'user-card',
  standalone: true,
  template: `<div>{{ user().name }}</div>`
})
export class UserCardComponent {
  user = input<{ name: string }>({ name: '' });
}
