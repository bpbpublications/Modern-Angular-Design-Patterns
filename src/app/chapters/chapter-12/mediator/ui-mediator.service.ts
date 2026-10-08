// ui-mediator.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiMediatorService {
  private readonly taskCompletedSource = new Subject<void>();
  readonly taskCompleted$ = this.taskCompletedSource.asObservable();

  notifyTaskCompleted(): void {
    this.taskCompletedSource.next();
  }
}
