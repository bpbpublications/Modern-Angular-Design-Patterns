import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-ch8-manage-users-page',
  imports: [RouterLink],
  template: `
    <h3>Manage users</h3>
    <p>Second page of the lazily loaded admin feature.</p>
    <p><a routerLink="..">Back to admin</a></p>
  `,
})
export class ManageUsersPage {}
