import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-ch9-admin-page',
  template: `
    <h3>Admin feature</h3>
    <p>
      This chunk was <em>not</em> part of the initial bundle — it was fetched the first time you
      navigated to <code>/admin</code>. Check the network tab.
    </p>
  `,
})
export class AdminPage {}
