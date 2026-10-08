import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ch11-transformed-user',
  imports: [DatePipe],
  template: `
    <h2>{{ user.name }}</h2>
    <p>Created: {{ user.createdAt | date }}</p>
  `,
})
export class TransformedUserComponent {
  user = { name: 'Jane Doe', createdAt: new Date('2026-01-01T12:00:00Z') };
}
