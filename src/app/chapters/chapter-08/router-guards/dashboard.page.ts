import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-ch8-guards-dashboard-page',
  template: `
    <h3>Dashboard</h3>
    <p>The <code>CanActivate</code> guard let you in — you are logged in.</p>
  `,
})
export class DashboardPage {}
