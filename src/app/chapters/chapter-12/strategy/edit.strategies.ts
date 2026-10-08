import { Injectable } from '@angular/core';
import { EditStrategy } from './edit-strategy';

@Injectable({ providedIn: 'root' })
export class InlineEditStrategy implements EditStrategy {
  startEdit(item: any) {
    // logic to edit in place
  }
}

@Injectable({ providedIn: 'root' })
export class ModalEditStrategy implements EditStrategy {
  startEdit(item: any) {
    // open modal for editing
  }
}
