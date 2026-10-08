// dynamic-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Question } from './question';
import { FormBuilderVisitor } from './form-builder.visitor';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="formGroup" (ngSubmit)="submitted.emit(formGroup.value)">
      @for (q of questions; track q.key) {
        <label [for]="q.key">{{ q.label }}</label>
        @switch (q.kind) {
          @case ('textbox')  { <input [formControlName]="q.key" [id]="q.key" /> }
          @case ('dropdown') {
            <select [formControlName]="q.key" [id]="q.key">
              @for (opt of q.options; track opt) { <option [value]="opt">{{ opt }}</option> }
            </select>
          }
        }
      }
      <button type="submit">Submit</button>
    </form>
  `
})
export class DynamicFormComponent {
  @Output() readonly submitted = new EventEmitter<Record<string, unknown>>();

  formGroup: FormGroup;
  questions: Question[] = [
    { kind: 'textbox', key: 'firstName', label: 'First Name' },
    { kind: 'dropdown', key: 'gender', label: 'Gender', options: ['Male', 'Female', 'Other'] }
  ];
  constructor(fb: FormBuilder) {
    const visitor = new FormBuilderVisitor(fb);
    this.questions.forEach(q => visitor.visit(q));
    this.formGroup = visitor.formGroup;
  }
}
