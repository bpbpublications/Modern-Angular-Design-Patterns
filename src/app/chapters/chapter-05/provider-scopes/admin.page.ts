import { Component, inject } from '@angular/core';
import { ADMIN_API } from './admin-api';

@Component({
  standalone: true,
  selector: 'app-admin-page',
  template: `<p>Admin Page — ADMIN_API.loadStats(): <code>{{ stats }}</code></p>`,
})
export class AdminPage {
  readonly stats = inject(ADMIN_API).loadStats();
}
