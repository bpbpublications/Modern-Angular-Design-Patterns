import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { ValidationStrategy } from './validation-strategy';

@Injectable({ providedIn: 'root' })
export class EmailValidationStrategy implements ValidationStrategy {
  validate(form: FormGroup): ValidationErrors | null {
    const email = form.get('email')?.value;
    return email && !email.includes('@') ? { invalidEmail: true } : null;
  }
}
