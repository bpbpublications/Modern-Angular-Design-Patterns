import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './app-state';
import { selectAllNotifications } from './notification.selectors';
import { loadNotifications } from './notification.actions';
export interface Notification { id: string; message: string; }

@Injectable({ providedIn: 'root' })
export class NotificationFacade {
  notifications$: Observable<Notification[]>;

  constructor(private store: Store<AppState>) {
    this.notifications$ = this.store.select(selectAllNotifications);
  }

  loadNotifications(message: string) {
    this.store.dispatch(loadNotifications({ message }));
  }
}
