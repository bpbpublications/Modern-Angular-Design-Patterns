import { Injectable } from '@angular/core';
import { Notifier } from './notifier';

// SMS notification service
@Injectable({ providedIn: 'root' })
export class SmsNotifierService implements Notifier {
  private rateLimit: Record<number, number> = {};

  notify(userId: number, message: string): void {
    const phoneNumber = this.getUserPhoneNumber(userId);

    if (this.validateMessage(message)) {
      this.sendSms(phoneNumber, message);
    } else {
      console.error('Invalid SMS content.');
    }
  }

  private getUserPhoneNumber(userId: number): string {
    return `+1234567890#${userId}`;
  }

  private validateMessage(message: string): boolean {
    return message.length <= 160; // SMS length limit
  }

  private sendSms(to: string, message: string): void {
    console.log(`Sending SMS to ${to}: ${message}`);
  }
}
