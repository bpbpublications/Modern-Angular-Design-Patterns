import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-ch8-admin-page',
  imports: [RouterLink],
  template: `
    <h3>Admin feature</h3>
    <p>This lazy-loaded feature area was fetched on demand via <code>loadChildren</code>.</p>
    <p><a routerLink="users">Manage users</a></p>
  `,
})
export class AdminPage {}
