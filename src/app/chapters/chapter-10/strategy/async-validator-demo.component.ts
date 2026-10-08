// ============================================================================
// GLUE FILE: Demonstrating The uniqueEmail Async Validator
// ============================================================================
// This file is NOT book code. It demonstrates the book's uniqueEmail async
// validator with a typed control, exactly as the book suggests: "Use with
// typed forms and show @if (email.hasError('emailTaken'))". The fake api
// (700 ms delay, a couple of already-taken addresses) and the pending/valid
// badges are for demo purposes — the validator itself is the book's code (see
// unique-email.validator.ts).
// ============================================================================
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { delay, of } from 'rxjs';
import { uniqueEmail } from './unique-email.validator';

// Supporting api: the validator's snippet expects an object with
// check(email) — this stand-in reports 'taken@example.com' and
// 'admin@example.com' as already registered.
const fakeApi = {
  check: (email: string) =>
    of(email === 'taken@example.com' || email === 'admin@example.com').pipe(delay(700)),
};

@Component({
  standalone: true,
  selector: 'app-ch10-async-validator',
  imports: [ReactiveFormsModule],
  template: `
    <p>
      <input [formControl]="email" placeholder="Try taken@example.com" />
      @if (email.pending) {
        <label class="pending">checking availability…</label>
      } @else if (email.hasError('emailTaken')) {
        <label class="error">This email is already taken.</label>
      } @else if (email.valid) {
        <label class="ok">available</label>
      }
    </p>
  `,
  styles: `
    label { font-size: 13px; }
    .pending { color: #b5541c; }
    .error { color: #c0392b; }
    .ok { color: #27a45f; }
  `,
})
export class AsyncValidatorDemoComponent {
  email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
    asyncValidators: [uniqueEmail(fakeApi)],
  });
}
