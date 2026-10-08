// dashboard.facade.ts
import { Injectable, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { AnalyticsService } from './analytics.service';
import { SalesService } from './sales.service';

@Injectable({ providedIn: 'root' })
export class DashboardFacade {
  private analyticsService = inject(AnalyticsService);
  private salesService = inject(SalesService);

  readonly metrics$ = combineLatest([
    this.analyticsService.getVisits(),
    this.analyticsService.getConversions(),
    this.salesService.getRevenue()
  ]).pipe(
    map(([visits, conversions, revenue]) => ({
      visits,
      conversions,
      revenue
    }))
  );
}
