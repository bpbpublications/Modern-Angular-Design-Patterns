// ============================================================================
// GLUE FILE: Hosting The "Tracking Form State" Snippets
// ============================================================================
// This file is NOT book code. It hosts the book's "Tracking form state"
// snippets:
//   1. the validation-feedback template block for the email control,
//   2. the TypeScript control-state property reads,
//   3. the canSubmit getter with its submit-button binding.
// ============================================================================
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-ch10-form-state',
  imports: [ReactiveFormsModule],
  templateUrl: './form-state.component.html',
  styleUrl: './form-state.component.scss',
})
export class FormStateComponent {
  // Backing form for the section's fragments.
  private fb = inject(FormBuilder);
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get email() {
    return this.form.controls.email;
  }
  private get emailControl() {
    return this.form.controls.email;
  }

  get canSubmit(): boolean {
    return this.form.valid && this.form.dirty;
  }

  onSubmit() {
    console.log('Form submitted:', this.form.value);
  }


  logStates() {
    // Accessing control state in TypeScript ---
    // this.emailControl.dirty      // true if modified
    // this.emailControl.valid      // true if passes validation
    // this.emailControl.pristine   // true if untouched
    // this.form.valid              // true if the entire form is valid

    // Surface the same values in the console panel.
    console.log(
      `emailControl.dirty=${this.emailControl.dirty} ` +
      `emailControl.valid=${this.emailControl.valid} ` +
      `emailControl.pristine=${this.emailControl.pristine} ` +
      `form.valid=${this.form.valid}`
    );
  }
}
