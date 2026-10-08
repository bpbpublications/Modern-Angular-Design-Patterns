// ============================================================================
// GLUE FILE: Hosting The "Applying The Strategy In A Form" Snippet
// ============================================================================
// This file is NOT book code. It hosts the book's "Applying the strategy in a
// form" snippet. The three statements run verbatim in the constructor (the
// book shows them as bare fragments referencing this.fb).
// ============================================================================
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { STRATEGY_VALIDATORS } from './validation-strategies';

@Component({
  standalone: true,
  selector: 'app-ch10-apply-strategy',
  imports: [ReactiveFormsModule],
  template: `
    <p>
      Active strategy:
      <select (change)="applyStrategy($any($event.target).value)">
        <option value="email">email</option>
        <option value="alphanumeric">alphanumeric</option>
      </select>
      <input [formControl]="emailCtl" [placeholder]="placeholder()" />
      <label [class.ok]="emailCtl.valid">
        {{ emailCtl.valid ? 'valid' : 'invalid: ' + errorKeys() }}
      </label>
    </p>
  `,
  styles: `
    label { color: #c0392b; font-size: 13px; }
    label.ok { color: #27a45f; }
  `,
})
export class ApplyStrategyComponent {
  private fb = inject(FormBuilder);

  emailCtl: FormControl<string>;
  readonly placeholder = signal('name@example.com');

  constructor() {
    const emailCtl = this.fb.control('', { nonNullable: true });
    emailCtl.setValidators(STRATEGY_VALIDATORS['email']);
    emailCtl.updateValueAndValidity();
    this.emailCtl = emailCtl;
  }

  // Swap in a different strategy from the registry by name.
  applyStrategy(key: string) {
    this.emailCtl.setValidators(STRATEGY_VALIDATORS[key]);
    this.emailCtl.updateValueAndValidity();
    this.placeholder.set(key === 'email' ? 'name@example.com' : 'letters and digits only');
    console.log(`Applied validation strategy '${key}'`);
  }

  errorKeys(): string {
    return Object.keys(this.emailCtl.errors ?? {}).join(', ');
  }
}
