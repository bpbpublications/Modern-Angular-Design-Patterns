import { Component } from '@angular/core';

@Component({
  selector: 'app-ch11-raw-user',
  template: `
    <h2>{{ user.user_name }}</h2>
    <p>Created: {{ user.account_created }}</p>
  `,
})
export class RawUserComponent {
  // raw API response used directly
  user = {
    user_id: 123,
    user_name: 'Jane Doe',
    account_created: '2026-01-01T12:00:00Z'
  };
}
