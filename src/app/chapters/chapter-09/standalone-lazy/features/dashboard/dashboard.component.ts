import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-ch9-standalone-dashboard',
  imports: [RouterLink],
  template: `
    <h3>Dashboard feature</h3>
    <p>Lazily loaded via <code>loadChildren</code> → <code>loadComponent</code>.</p>
    <p><a routerLink="users">Dashboard users (separate lazy chunk)</a></p>
  `,
})
export class DashboardComponent {}
