import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-ch9-beta-page',
  template: `
    <h3>Beta feature</h3>
    <p>
      The <code>enableBeta</code> flag is on, so <code>canMatch</code> allowed this lazy feature
      to match and load. Turn the flag off on the chapter page and try again — you will be
      redirected to the home page without the chunk ever loading.
    </p>
  `,
})
export class BetaPage {}
