import { Injectable } from '@angular/core';
import { MenuItem } from './menu-item';

@Injectable({ providedIn: 'root' })
export class MenuIteratorService {
  *traverse(menuItems: MenuItem[]): Generator<MenuItem> {
    for (const item of menuItems) {
      yield item;
      if (item.children?.length) {
        yield* this.traverse(item.children);
      }
    }
  }
}
