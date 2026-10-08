// shared/notification.service.ts
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class NotificationService {
  error(_msg: string) {}
  warning(_msg: string) {}
}
