import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  message: string;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private subject = new Subject<Notification>();
  notifications$ = this.subject.asObservable();

  notify(message: string) {
    this.subject.next({ message, timestamp: Date.now() });
  }
}
