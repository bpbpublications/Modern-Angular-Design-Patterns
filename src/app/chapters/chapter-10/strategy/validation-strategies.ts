// The Strategy registry: a typed map from string keys to ValidatorFn. 
// The non-null assertion after compose is intentional 
// (it returns ValidatorFn | null and a value is known to exist).
import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from
'@angular/forms';

export const STRATEGY_VALIDATORS: Record<string, ValidatorFn> = {
  email: Validators.compose([Validators.required, Validators.email])!,
  alphanumeric: (c: AbstractControl): ValidationErrors | null =>
    /^[a-z0-9]*$/i.test(c.value ?? '') ? null : { alphanumeric: true },
};
