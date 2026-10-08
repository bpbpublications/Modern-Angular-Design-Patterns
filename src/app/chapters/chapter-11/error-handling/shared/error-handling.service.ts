// shared/error-handling.service.ts
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class ErrorHandlingService {
  constructor(private notificationService: NotificationService) {}

  handleError(error: HttpErrorResponse): void {
    if (error.status === 0) {
      this.notificationService.error('Network error. Please try again later.');
    } else if (error.status === 401) {
      this.notificationService.warning('Unauthorized. Please log in again.');
    } else if (error.status === 500) {
      this.notificationService.error('Server error. Our team is looking into it.');
    } else {
      this.notificationService.error(error.message || 'An unexpected error occurred.');
    }

    // Optionally log errors or send to external monitoring tools
    console.error('API Error:', error);
  }
}
