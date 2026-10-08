import { Component, input, inject } from '@angular/core';
import { MenuIteratorService } from './menu-iterator.service';
import { MenuItem } from './menu-item';

@Component({
  standalone: true,
  selector: 'app-menu',
  template: `
    <ul>
      @for (m of flatMenu; track m.id) {
        <li>{{ m.label }}</li>
      }
    </ul>
  `
})
export class MenuComponent {
  menu = input<MenuItem[]>([]);
  flatMenu: MenuItem[] = [];

  private menuIterator = inject(MenuIteratorService);

  ngOnInit() {
    const items = this.menuIterator.traverse(this.menu());
    for (let item of items) {
      this.flatMenu.push(item);
    }
  }
}
