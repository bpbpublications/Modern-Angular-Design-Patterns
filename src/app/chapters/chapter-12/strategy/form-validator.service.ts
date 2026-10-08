// form-validator.service.ts
import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VALIDATION_STRATEGY } from './validation-strategy.token';
import { ValidationStrategy } from './validation-strategy';

@Injectable({ providedIn: 'root' })
export class FormValidatorService {
  private strategy = inject<ValidationStrategy>(VALIDATION_STRATEGY);
  validateForm(form: FormGroup) { return this.strategy.validate(form); }
}
