import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  warn(message: string) {
    console.warn(`[notification] ${message}`);
  }

  error(message: string) {
    console.error(`[notification] ${message}`);
  }
}
