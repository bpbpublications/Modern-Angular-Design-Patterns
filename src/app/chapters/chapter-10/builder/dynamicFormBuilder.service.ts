import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { FormElementConfig } from './formElementConfig';
import { DynamicFormBuilder } from './dynamicFormBuilder';

@Injectable({ providedIn: 'root' })
export class DynamicFormBuilderService {
  createDynamicFormBuilder(): DynamicFormBuilder {
    return new DynamicFormBuilder();
  }
  createDynamicForm(formElements: FormElementConfig[]): FormGroup {
    const formBuilder = this.createDynamicFormBuilder();
    formElements.forEach(element => formBuilder.addDynamicElement(element));
    return formBuilder.build();
  }
}
