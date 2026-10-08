import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-ch8-settings',
  imports: [RouterLink, RouterOutlet],
  template: `
    <h3>Settings</h3>
    <p>
      Tabs (child routes):
      <a routerLink="profile">Profile</a> ·
      <a routerLink="security">Security</a>
    </p>
    <router-outlet></router-outlet>
  `,
})
export class SettingsComponent {}
