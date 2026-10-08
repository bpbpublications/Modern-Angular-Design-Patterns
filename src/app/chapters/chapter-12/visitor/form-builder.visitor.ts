// form-builder.visitor.ts
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from './question';

export class FormBuilderVisitor {
  readonly formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({});
  }

  visit(q: Question): void {
    if (q.kind === 'textbox') {
      this.formGroup.addControl(
        q.key,
        this.fb.control(q.value ?? '', Validators.required)
      );
    } else if (q.kind === 'dropdown') {
      this.formGroup.addControl(
        q.key,
        this.fb.control(q.value ?? null, Validators.required)
      );
    }
  }
}
