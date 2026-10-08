import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-ch8-route-config-settings-page',
  imports: [RouterOutlet],
  template: `
    <h3>Settings page</h3>
    <router-outlet></router-outlet>
  `,
})
export class SettingsPage {}
