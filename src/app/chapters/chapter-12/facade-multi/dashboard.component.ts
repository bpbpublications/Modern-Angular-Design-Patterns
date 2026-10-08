// dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { DashboardFacade } from './dashboard.facade';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <div class="dashboard">
      <h2>Dashboard Metrics</h2>
      @if (facade.metrics$ | async; as metrics) {
        <p><strong>Visits:</strong> {{ metrics.visits }}</p>
        <p><strong>Conversions:</strong> {{ metrics.conversions }}</p>
        <p><strong>Revenue:</strong> \${{ metrics.revenue }}</p>
      } @else {
        <p>Loading metrics...</p>
      }
    </div>
  `
})
export class DashboardComponent {
  constructor(public facade: DashboardFacade) {}
}
