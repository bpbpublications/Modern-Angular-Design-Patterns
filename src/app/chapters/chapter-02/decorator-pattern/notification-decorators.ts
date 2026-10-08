// Base interface for all notifications
export interface Notification {
  send(message: string): string;
}

// Base notification class (default behavior)
export class BasicNotification implements Notification {
  send(message: string): string {
    return `Sending basic notification: ${message}`;
  }
}

// Base decorator class
export class NotificationDecorator implements Notification {
  constructor(protected notification: Notification) {}
  send(message: string): string {
    return this.notification.send(message);
  }
}

// Adds Email notification functionality
export class EmailNotification extends NotificationDecorator {
  override send(message: string): string {
    return `Email: ${super.send(message)}`;
  }
}

// Adds SMS notification functionality
export class SMSNotification extends NotificationDecorator {
  override send(message: string): string {
    return `SMS: ${super.send(message)}`;
  }
}
