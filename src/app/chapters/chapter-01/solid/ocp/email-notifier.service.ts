import { Injectable } from '@angular/core';
import { Notifier } from './notifier';

// Email notification service
@Injectable({ providedIn: 'root' })
export class EmailNotifierService implements Notifier {
  private emailTemplate = (message: string) => `
    <html>
      <body>
        <h1>Account Alert</h1>
        <p>${message}</p>
        <p>Thank you,</p>
        <p>Team</p>
      </body>
    </html>
  `;

  notify(userId: number, message: string): void {
    const emailBody = this.emailTemplate(message);
    const emailAddress = this.getUserEmail(userId);

    this.sendEmail(emailAddress, 'Important Notification', emailBody);
  }

  private getUserEmail(userId: number): string {
    // Simulate user lookup
    return `user${userId}@example.com`;
  }

  private sendEmail(to: string, subject: string, body: string): void {
    console.log(`Sending email to ${to} | Subject: ${subject} | Body: ${body}`);
  }
}
