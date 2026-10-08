import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorStateService } from './editor-state.service';

@Component({
  standalone: true,
  selector: 'app-editor-page',
  imports: [FormsModule],
  template: `
    <p>Editor page — draft state lives in the scoped <code>EditorStateService</code>:</p>
    <input [(ngModel)]="state.draft" placeholder="Type a draft…" />
  `,
})
export class EditorPage {
  readonly state = inject(EditorStateService);
}
