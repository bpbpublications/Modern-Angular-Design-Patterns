import { Component } from '@angular/core';
import { AppEventType, EventBusService } from './event-bus.service';

@Component({
  selector: 'app-emitter',
  standalone: true,
  template: `
    <button (click)="emit()">
      emit(&#123; type: AppEventType.Navigate, payload: '/dashboard' &#125;)
    </button>
  `,
})
export class EmitterComponent {
  constructor(private eventBus: EventBusService) {}

  emit(): void {
    // EmitterComponent
    this.eventBus.emit({ type: AppEventType.Navigate, payload: '/dashboard' });
  }
}
