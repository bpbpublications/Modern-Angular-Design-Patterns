import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-ch9-dashboard-users',
  imports: [RouterLink],
  template: `
    <h3>Dashboard users</h3>
    <p>Loaded on demand with its own <code>loadComponent</code> chunk.</p>
    <p><a routerLink="..">Back to dashboard</a></p>
  `,
})
export class DashboardUsersComponent {}
