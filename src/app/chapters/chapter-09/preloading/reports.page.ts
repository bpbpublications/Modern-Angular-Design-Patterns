import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-ch9-reports-page',
  template: `
    <h3>Reports feature</h3>
    <p>
      This route carries <code>data: &#123; preload: true &#125;</code>. With
      <code>SelectivePreloadingStrategy</code> registered at bootstrap it would be fetched in the
      background right after app init; here it loads lazily on first navigation.
    </p>
  `,
})
export class ReportsPage {}
