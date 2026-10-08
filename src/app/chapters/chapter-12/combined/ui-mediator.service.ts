import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiMediatorService {
  private taskCompletedSource = new Subject<string>();
  taskCompleted$ = this.taskCompletedSource.asObservable();

  notifyTaskCompleted(taskName: string) {
    this.taskCompletedSource.next(taskName);
  }
}
