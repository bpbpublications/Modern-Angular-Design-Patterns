// event-bus.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventBusService {
  private notificationSubject = new Subject<string>();
  notification$ = this.notificationSubject.asObservable();

  emitNotification(message: string) {
    this.notificationSubject.next(message);
  }
}
