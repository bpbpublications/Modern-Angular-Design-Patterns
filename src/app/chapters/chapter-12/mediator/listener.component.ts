import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppEventType, EventBusService } from './event-bus.service';

@Component({
  selector: 'app-listener',
  standalone: true,
  template: ``,
})
export class ListenerComponent {
  constructor(private eventBus: EventBusService, private router: Router) {
    // ListenerComponent
    this.eventBus.on<string>(AppEventType.Navigate).subscribe(
      path => this.router.navigateByUrl(path));
  }
}
