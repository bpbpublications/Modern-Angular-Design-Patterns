import { Component, signal, computed, effect } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-books',
  template: `
    <input placeholder="Filter" (input)="query.set($any($event.target).value)" />
    <ul>
      @for (b of filtered(); track b) {
        <li>{{ b }}</li>
      }
    </ul>
  `,
})
export class BooksComponent {
  private all = signal(['Angular in Depth', 'Angular for Beginners', 'Signals & State', 'Routing Recipes', 'Mastering RxJS']);
  query = signal('');
  filtered = computed(() => {
    const q = this.query().toLowerCase();
    return this.all().filter(b => b.toLowerCase().includes(q));
  });

  constructor() {
    effect(() => console.log(`Filter: "${this.query()}" — ${this.filtered().length} result(s)`));
  }
}
