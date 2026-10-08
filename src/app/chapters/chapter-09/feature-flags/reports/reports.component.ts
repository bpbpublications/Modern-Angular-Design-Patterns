import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-ch9-reports',
  template: `
    <div class="reports">
      <strong>Reports</strong>
      <p>Dynamically imported and rendered because <code>showReports</code> is enabled.</p>
    </div>
  `,
  styles: `
    .reports {
      border: 1px dashed #7a7fa8;
      border-radius: 8px;
      padding: 10px 14px;
      background: #f4f5fb;
    }
  `,
})
export class ReportsComponent {}
