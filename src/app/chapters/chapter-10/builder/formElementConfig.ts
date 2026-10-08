import { ValidatorFn, Validators } from '@angular/forms';

export interface FormElementConfig {
    // You can add more types as needed
    type: 'text' | 'number' | 'checkbox' | 'email' | 'password';
    label: string;
    name: string;
    placeholder?: string;
    value?: any;
    validators?: ValidatorFn[];
}

// "This interface can be used to define a set of fields:"
export const formElements: FormElementConfig[] = [
    { type: 'text', label: 'First Name', name: 'firstName',
      placeholder: 'Please enter some text', validators: [Validators.required] },
    { type: 'email', label: 'Email', name: 'email',
      validators: [Validators.required, Validators.email] },
  ];
