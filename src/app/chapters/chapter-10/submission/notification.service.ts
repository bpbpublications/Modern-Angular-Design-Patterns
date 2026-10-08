import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  success(message: string) {
    console.log(`[notification] ${message}`);
  }

  error(message: string) {
    console.error(`[notification] ${message}`);
  }
}
