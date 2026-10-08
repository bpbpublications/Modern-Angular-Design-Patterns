import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormBuilderService } from './dynamicFormBuilder.service';
import { FormElementConfig } from './formElementConfig';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="dynamicForm" (ngSubmit)="onSubmit()">
      @for (controlName of controlNames; track $index) {
        <div>
          <label [for]="controlName">{{ controlName }}</label>
          <input [type]="getInputType(controlName)" [id]="controlName"
            [formControlName]="controlName">
        </div>
      }
      <div><button type="submit">Submit</button></div>
    </form>
  `,
})
export class DynamicFormComponent implements OnInit {
  dynamicForm: FormGroup;
  formElements: FormElementConfig[] = [
    { type: 'text', label: 'First Name', name: 'firstName', placeholder: 'Please enter some text', validators: [Validators.required] },
    { type: 'email', label: 'Email', name: 'email', validators: [Validators.required, Validators.email] },
  ];

  constructor(private formBuilder: DynamicFormBuilderService) {}

  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.createDynamicForm(this.formElements);
  }

  getInputType(controlName: string): string {
    const element = this.formElements.find(el => el.name === controlName);
    return element ? element.type : 'text';
  }

  get controlNames(): string[] {
    return Object.keys(this.dynamicForm.controls);
  }

  onSubmit() {
    console.log(this.dynamicForm.value);
  }
}
