// app/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit(form)">
      <input name="email" ngModel required email />
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `,
})
export class LoginComponent {
  onSubmit(form: any) {
    // handle submission
    console.log('Form submitted:', form.value);
  }
}
