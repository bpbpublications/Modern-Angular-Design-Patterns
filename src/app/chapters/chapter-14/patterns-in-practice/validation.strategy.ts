import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export interface ValidationStrategy {
  validate(control: AbstractControl): ValidationErrors | null;
}

@Injectable({ providedIn: 'root' })
export class EmailValidation implements ValidationStrategy {
  validate(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    return /@/.test(email) ? null : { invalidEmail: true };
  }
}
