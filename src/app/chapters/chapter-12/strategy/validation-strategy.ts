import { FormGroup, ValidationErrors } from '@angular/forms';

export interface ValidationStrategy {
  validate(form: FormGroup): ValidationErrors | null;
}
