import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <div class="modal">
      <ng-content select="header"></ng-content>
      <ng-content select=".main-content"></ng-content>
      <ng-content select="[modal-footer]"></ng-content>
    </div>
  `
})
export class ModalComponent {}
