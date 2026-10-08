import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { FormElementConfig } from './formElementConfig';

export class DynamicFormBuilder {
  private formControls: Record<string, FormControl> = {};

  addDynamicElement(element: FormElementConfig): DynamicFormBuilder {
    const validators = element.validators ?? [];
    const formControl = new FormControl(element.value ?? '', validators);
    this.formControls[element.name] = formControl;
    return this;
  }

  addTextElement(name: string, label: string, value?: string, placeholder?: string, validators?: ValidatorFn[]): DynamicFormBuilder {
    return this.addDynamicElement(
      {type: 'text', name, label, value, placeholder, validators});
  }

  addNumberElement(name: string, label: string, value?: number, validators?: ValidatorFn[]): DynamicFormBuilder {
    return this.addDynamicElement(
      {type: 'number', name, label, value, validators});
  }

  addCheckboxElement(name: string, label: string, value?: boolean, validators?: ValidatorFn[]): DynamicFormBuilder {
    return this.addDynamicElement(
      {type: 'checkbox', name, label, value, validators});
  }

  addEmailElement(name: string, label: string, value?: string, placeholder?: string, validators?: ValidatorFn[]): DynamicFormBuilder {
    return this.addDynamicElement(
      {type: 'email', name, label, value, placeholder, validators});
  }

  addPasswordElement(name: string, label: string, value?: string, placeholder?: string, validators?: ValidatorFn[]): DynamicFormBuilder {
    return this.addDynamicElement(
      {type: 'password', name, label, value, placeholder, validators});
  }

  build(): FormGroup {
    return new FormGroup(this.formControls);
  }
}
