import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState, selectCurrentUser } from './session.state';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe],
  template: `@if (user$ | async; as user) { <div>Welcome, {{ user.name }}</div> }`
})
export class DashboardComponent {
  private store: Store<AppState> = inject(Store);

  user$ = this.store.select(selectCurrentUser);
}
