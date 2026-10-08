import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-lazy-home',
  imports: [RouterLink],
  template: `
    <h2>Lazily loaded: Home</h2>
    <p>This component was loaded on demand via <code>loadComponent</code>.</p>
    <nav>
      <a routerLink="/chapter-01/lazy-demo/dashboard">Go to Dashboard (lazy)</a> ·
      <a routerLink="/chapter-01">Back to Chapter 1</a>
    </nav>
  `,
})
export class HomeComponent {}
