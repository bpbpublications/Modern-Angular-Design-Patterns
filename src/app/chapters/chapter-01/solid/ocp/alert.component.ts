import { Component, inject } from '@angular/core';
import { Notifier } from './notifier';

// Component using the notifier abstraction
@Component({
  selector: 'app-alert',
  template: `<button (click)="sendAlert()">Notify User</button>`
})
export class AlertComponent {
  private readonly notifier = inject(Notifier);

  sendAlert(): void {
    const userId = 42;
    this.notifier.notify(userId, 'We detected a login from a new device.');
  }
}
