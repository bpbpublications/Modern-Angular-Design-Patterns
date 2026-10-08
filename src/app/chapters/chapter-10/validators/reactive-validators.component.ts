// ============================================================================
// GLUE FILE: Hosting The "Overview Of Built-In Validators" Reactive Snippets
// ============================================================================
// This file is NOT book code. It hosts the book's "Overview of built-in
// validators" reactive snippets. Each `new FormControl(...)` construction, the
// FormBuilder group from "Applying validators in reactive forms", and the two
// "Combining multiple validators" variants are kept verbatim; the field
// names, input bindings and live status badges are for demo purposes 
// so every control is interactive with visible validation state.
// ============================================================================
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-ch10-reactive-validators',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-validators.component.html',
  styleUrl: './reactive-validators.component.scss',
})
export class ReactiveValidatorsComponent {
  requiredCtl = new FormControl('', Validators.required);
  lengthCtl = new FormControl('', [Validators.minLength(3), Validators.maxLength(10)]);
  patternCtl = new FormControl('', Validators.pattern('^[a-zA-Z0-9_]+$'));
  emailCtl = new FormControl('', [Validators.required, Validators.email]);
  nullCtl = new FormControl('', Validators.nullValidator);

  composeCtl = new FormControl('', Validators.compose([
    Validators.required,
    Validators.pattern(/^[A-Z]/)
  ]));

  arrayCtl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[A-Z]/)
  ]);

  private fb = inject(FormBuilder);
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  status(control: AbstractControl): string {
    return control.valid ? 'valid' : `invalid: ${Object.keys(control.errors ?? {}).join(', ')}`;
  }
}
