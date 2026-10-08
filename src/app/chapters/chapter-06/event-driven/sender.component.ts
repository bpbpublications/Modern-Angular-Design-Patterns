// sender.component.ts
import { Component } from '@angular/core';
import { EventBusService } from './event-bus.service';

@Component({
  standalone: true,
  selector: 'app-sender',
  template: `<button (click)="notify()">Notify</button>`
})
export class SenderComponent {
  constructor(private eventBus: EventBusService) {}

  notify() {
    this.eventBus.emitNotification('Data has been updated!');
  }
}
