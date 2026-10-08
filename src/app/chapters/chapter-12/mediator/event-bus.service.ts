// event-bus.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable, filter, map } from 'rxjs';

export enum AppEventType {
  Navigate = 'NAVIGATE',
  RefreshNotifications = 'REFRESH_NOTIFICATIONS'
}

export interface AppEvent<T = unknown> {
  type: AppEventType;
  payload: T;
}

@Injectable({ providedIn: 'root' })
export class EventBusService {
  private readonly events$ = new Subject<AppEvent>();

  emit<T>(event: AppEvent<T>): void {
    this.events$.next(event);
  }

  on<T = unknown>(type: AppEventType): Observable<T> {
    return this.events$.pipe(
      filter(event => event.type === type),
      map(event => event.payload as T)
    );
  }
}
