import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { ValidationStrategy } from './validation-strategy';

@Injectable({ providedIn: 'root' })
export class PhoneValidationStrategy implements ValidationStrategy {
  validate(form: FormGroup): ValidationErrors | null {
    const phone = form.get('phone')?.value;
    return phone && phone.length < 10 ? { invalidPhone: true } : null;
  }
}
