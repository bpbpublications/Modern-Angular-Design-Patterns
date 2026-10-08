import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-ch8-basic-home',
  template: `
    <h3>Home</h3>
    <p>Rendered by <code>HomeComponent</code> for the <code>/home</code> path.</p>
  `,
})
export class HomeComponent {}
