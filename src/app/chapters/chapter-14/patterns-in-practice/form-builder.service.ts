import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { FieldConfig } from './field-config';

@Injectable({ providedIn: 'root' })
export class FormBuilderService {
  createField(fieldConfig: FieldConfig): AbstractControl {
    switch (fieldConfig.type) {
      case 'text': return new FormControl('', Validators.required);
      case 'select': return new FormControl(fieldConfig.options[0]);
      default: return new FormControl('');
    }
  }
}
