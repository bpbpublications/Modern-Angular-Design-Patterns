export interface Notification {
  send(message: string): void;
}
export class EmailNotification implements Notification {
  send(message: string) {
    console.log(`Sending Email: ${message}`);
  }
}
export class SMSNotification implements Notification {
  send(message: string) {
    console.log(`Sending SMS: ${message}`);
  }
}
export class NotificationFactory {
  static createNotification(type: 'email' | 'sms'): Notification {
    return type === 'email' ? new EmailNotification() : new SMSNotification();
  }
}
