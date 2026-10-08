import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-ch8-basic-about',
  template: `
    <h3>About</h3>
    <p>Rendered by <code>AboutComponent</code> for the <code>/about</code> path.</p>
  `,
})
export class AboutComponent {}
