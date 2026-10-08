import { Injectable } from '@angular/core';

export interface Notification {
  send(message: string): void;
}
export class EmailNotification implements Notification {
  send(message: string) { console.log(`Sending email: ${message}`); }
}
export class SMSNotification implements Notification {
  send(message: string) { console.log(`Sending SMS: ${message}`); }
}
@Injectable({ providedIn: 'root' })
export class NotificationFactory {
  static createNotification(type: 'email' | 'sms'): Notification {
    return type === 'email' ? new EmailNotification() : new SMSNotification();
  }
}
