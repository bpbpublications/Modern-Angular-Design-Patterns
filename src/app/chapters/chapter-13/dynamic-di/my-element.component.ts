import { Component } from '@angular/core';
import { LoggingService } from './shared/logging.service';

@Component({
  selector: 'my-element',
  standalone: true,
  template: `
    <div class="my-element">
      <em>&lt;my-element&gt; micro frontend</em>
      <button (click)="ping()">logger.log('ping from my-element')</button>
    </div>
  `,
  styles: `.my-element { display: inline-flex; gap: 10px; align-items: center; background: #f4f5fb; border-radius: 8px; padding: 8px 12px; }`,
})
export class MyElementComponent {
  constructor(private logger: LoggingService) {
    this.logger.log('MyElementComponent created — LoggingService resolved from the shared injector');
  }

  ping() {
    this.logger.log('ping from my-element');
  }
}
