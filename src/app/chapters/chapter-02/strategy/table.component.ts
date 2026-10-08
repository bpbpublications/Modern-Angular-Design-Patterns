import { Component, inject } from '@angular/core';
import { SortingStrategy } from './sorting-strategy';

@Component({
  selector: 'app-table',
  template: `<p><code>{{ strategyName }}</code> sorted [42, 7, 19, 3, 88] → {{ sorted.join(', ') }}</p>`,
})
export class TableComponent {
  private strategy = inject(SortingStrategy);
  strategyName = this.strategy.constructor.name;
  sorted = this.strategy.sort([42, 7, 19, 3, 88]);
}
