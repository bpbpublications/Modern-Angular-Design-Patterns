// ============================================================================
// GLUE FILE: Hosting The "Reactive Form Submission Workflow" Snippets
// ============================================================================
// This file is NOT book code. It hosts the book's "Reactive form submission
// workflow" snippets: the onSubmit() method body and the <form> template with
// the disabled submit button are the book's code.
// ============================================================================
import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, of, tap } from 'rxjs';
import { UserService } from './user.service';
import { NotificationService } from './notification.service';

@Component({
  standalone: true,
  selector: 'app-ch10-submission-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <!-- form fields -->
      <input formControlName="email" placeholder="email ('fail' in it → server error)" />
      <button type="submit" [disabled]="form.invalid || isSubmitting">Submit</button>
    </form>
    <p class="status">
      form.valid: <code>{{ form.valid }}</code> ·
      isSubmitting: <code>{{ isSubmitting }}</code>
      — success and failure notifications appear in the console panel.
    </p>
  `,
  styles: `
    form { display: flex; gap: 8px; align-items: center; }
    input { min-width: 280px; }
    .status { color: #5a5f7d; font-size: 13px; }
  `,
})
export class SubmissionFormComponent {
  // Backing state and collaborators referenced by the example's snippet.
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private notificationService = inject(NotificationService);
  private destroyRef = inject(DestroyRef);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  isSubmitting = false;

  onSubmit() {
    if (this.form.invalid) return;

    this.isSubmitting = true;

    this.userService.saveUser(this.form.value).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(() => this.notificationService.success('Form submitted successfully')),
      catchError(error => {
        this.notificationService.error('Submission failed');
        return of(error);
      }),
      finalize(() => this.isSubmitting = false)
    ).subscribe();
  }
}
