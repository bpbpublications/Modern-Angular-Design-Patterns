// receiver.component.ts
import { Component, DestroyRef, inject } from '@angular/core';
import { EventBusService } from './event-bus.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-receiver',
  template: `
      @if (message) {
    <p>{{ message }}</p>
   }`
})
export class ReceiverComponent {
  message: string = '';
  private eventBus = inject(EventBusService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.eventBus.notification$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(msg => this.message = msg);
  }}
