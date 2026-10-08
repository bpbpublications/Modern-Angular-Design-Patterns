import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  trackPageView(url: string) {
    console.log(`[analytics] page view: ${url}`);
  }
}
