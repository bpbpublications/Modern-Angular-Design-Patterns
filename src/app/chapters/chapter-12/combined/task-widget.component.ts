// task-widget.component.ts
import { Component, inject } from '@angular/core';
import { UiMediatorService } from './ui-mediator.service';

@Component({
  selector: 'app-task-widget',
  standalone: true,
  template: `
    <div class="task-widget">
      <h3>Task Widget</h3>
      @for (task of tasks; track $index) {
        <div>
          {{ task.name }}
          <button (click)="completeTask(task.name)">Complete</button>
        </div>
      }
    </div>
  `
})
export class TaskWidgetComponent {
  tasks = [{ name: 'Task 1' }, { name: 'Task 2' }, { name: 'Task 3' }];
  private mediator = inject(UiMediatorService);

  completeTask(taskName: string) { 
    this.mediator.notifyTaskCompleted(taskName); 
  }
}
