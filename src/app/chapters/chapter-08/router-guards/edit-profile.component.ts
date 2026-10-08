// The editable field is for demo purposes: hasUnsavedChanges() reports true
// while the draft differs from the last saved value.
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-ch8-edit-profile',
  imports: [FormsModule],
  template: `
    <h3>Edit profile</h3>
    <p>
      Display name: <input [(ngModel)]="draft" />
      <button (click)="save()">Save</button>
    </p>
    <p>
      hasUnsavedChanges(): <code>{{ hasUnsavedChanges() }}</code>
      — try navigating away while it is <code>true</code> and the
      <code>CanDeactivate</code> guard will ask for confirmation.
    </p>
  `,
})
export class EditProfileComponent {
  saved = 'Ada Lovelace';
  draft = this.saved;

  hasUnsavedChanges(): boolean {
    return this.draft !== this.saved;
  }

  save() {
    this.saved = this.draft;
    console.log('EditProfileComponent: changes saved');
  }
}
