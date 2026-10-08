import { Injectable, inject } from '@angular/core';
import { Observable, EMPTY, expand, map, reduce } from 'rxjs';
import { ApiService } from './api.service';
import { Item } from './models';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  private api = inject(ApiService);

  loadPages(): Observable<Item[]> {
    return this.api.getPage(1).pipe(
      expand(page => page.hasNext ? this.api.getPage(page.next) : EMPTY),
      map(page => page.items),
      // Compile fix: the book seeds reduce() with a bare [], which TypeScript
      // infers as never[]; typing the seed as Item[] keeps the snippet compiling.
      reduce((acc, items) => acc.concat(items), [] as Item[])
    );
  }
}
