import { Component } from '@angular/core';
import { SomeSharedDirective } from './some-shared.directive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [SomeSharedDirective]
})
export class DashboardComponent {}
