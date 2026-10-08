// unique-email.validator.ts
import { AsyncValidatorFn, AbstractControl } from
'@angular/forms';
import { map, catchError, of } from 'rxjs';

export const uniqueEmail = (api: { check(email: string): any }): AsyncValidatorFn =>
  (control: AbstractControl) =>
    api.check(control.value).pipe(
      map((isTaken: boolean) => (isTaken ? { emailTaken: true } : null)),
      catchError(() => of(null))
    );
