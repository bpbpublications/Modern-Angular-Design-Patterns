// notification-center.component.ts
import { Component, OnDestroy } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { NotificationFacade } from './notification.facade';
import { UiMediatorService } from './ui-mediator.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-center',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <div class="notification-center">
      <h3>Notification Center</h3>
      @if (facade.notifications$ | async; as notifications) {
        <ul>
          @for (n of notifications; track n.id) { <li>{{ n.message }}</li> }
        </ul>
      }
      <button (click)="loadNotifications('Notifications refreshed!')">Refresh Notifications</button>
    </div>
  `
})
export class NotificationCenterComponent implements OnDestroy {
  private sub = new Subscription();

  constructor(public facade: NotificationFacade, mediator: UiMediatorService) {
    this.sub.add(mediator.taskCompleted$.subscribe((message: string) => this.loadNotifications(message)));
  }
  loadNotifications(message: string) { 
    this.facade.loadNotifications(message); 
  }
  ngOnDestroy() { 
    this.sub.unsubscribe(); 
  }
}
