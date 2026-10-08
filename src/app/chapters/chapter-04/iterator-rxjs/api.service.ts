import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Item, Page } from './models';

const PAGES: Item[][] = [
  [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ],
  [
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
  ],
  [{ id: 5, name: 'Item 5' }],
];

@Injectable({ providedIn: 'root' })
export class ApiService {
  getPage(page: number): Observable<Page> {
    console.log(`ApiService.getPage(${page}) requested`);
    return of({
      items: PAGES[page - 1] ?? [],
      hasNext: page < PAGES.length,
      next: page + 1,
    }).pipe(delay(150));
  }
}
