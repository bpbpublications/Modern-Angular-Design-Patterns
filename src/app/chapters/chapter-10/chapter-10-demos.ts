// ============================================================================
// DEMO HOSTS: Chapter 10 Interactive Demos
// ============================================================================
// Wire the book's snippets into interactive demos without modifying the
// snippet code itself. The two book LoginComponents share the selector
// 'app-login', so each one gets its own wrapper host — they are never
// placed in the same imports array.
// ============================================================================
import { Component } from '@angular/core';
import { LoginComponent as TemplateLoginComponent } from './template-driven/login.component';
import { LoginComponent as ReactiveLoginComponent } from './reactive/login.component';
import { FormStateComponent } from './form-state/form-state.component';
import { ReactiveValidatorsComponent } from './validators/reactive-validators.component';
import { TemplateValidatorsComponent } from './validators/template-validators.component';
import { DynamicFormComponent } from './builder/dynamic-form.component';
import { ApplyStrategyComponent } from './strategy/apply-strategy.component';
import { AsyncValidatorDemoComponent } from './strategy/async-validator-demo.component';
import { SubmissionFormComponent } from './submission/submission-form.component';

@Component({
  selector: 'app-ch10-template-login-demo',
  imports: [TemplateLoginComponent],
  template: `
    <app-login />
    <p class="note">
      Type into the email field: the submit button stays disabled while
      <code>form.invalid</code> is true (the <code>required</code> and <code>email</code>
      attribute validators drive the ngForm's validity).
    </p>
  `,
  styles: `.note { color: #5a5f7d; font-size: 13px; }`,
})
export class Ch10TemplateLoginDemo {}

@Component({
  selector: 'app-ch10-reactive-login-demo',
  imports: [ReactiveLoginComponent],
  template: `
    <app-login #login />
    <p class="note">
      Live component state (read through a template reference — the host never touches the
      book code): form.status = <code>{{ login.form.status }}</code>, value =
      <code>{{ login.form.value.email }}</code>
    </p>
  `,
  styles: `.note { color: #5a5f7d; font-size: 13px; }`,
})
export class Ch10ReactiveLoginDemo {}

@Component({
  selector: 'app-ch10-form-state-demo',
  imports: [FormStateComponent],
  template: `<app-ch10-form-state />`,
})
export class Ch10FormStateDemo {}

@Component({
  selector: 'app-ch10-validators-demo',
  imports: [ReactiveValidatorsComponent, TemplateValidatorsComponent],
  template: `
    <h4>Reactive forms</h4>
    <app-ch10-reactive-validators />
    <h4>Template-driven forms</h4>
    <app-ch10-template-validators />
  `,
  styles: `h4 { margin: 8px 0 6px; font-size: 14px; }`,
})
export class Ch10ValidatorsDemo {}

@Component({
  selector: 'app-ch10-builder-demo',
  imports: [DynamicFormComponent],
  template: `
    <app-dynamic-form />
    <p class="note">
      The form above is generated at runtime from the <code>FormElementConfig</code> array by
      <code>DynamicFormBuilderService</code> → <code>DynamicFormBuilder</code> →
      <code>FormGroup</code>. Submit logs the form value to the console panel.
    </p>
  `,
  styles: `.note { color: #5a5f7d; font-size: 13px; }`,
})
export class Ch10BuilderDemo {}

@Component({
  selector: 'app-ch10-strategy-demo',
  imports: [ApplyStrategyComponent, AsyncValidatorDemoComponent],
  template: `
    <h4>Strategy registry (STRATEGY_VALIDATORS)</h4>
    <app-ch10-apply-strategy />
    <h4>Async validator (uniqueEmail)</h4>
    <app-ch10-async-validator />
  `,
  styles: `h4 { margin: 8px 0 6px; font-size: 14px; }`,
})
export class Ch10StrategyDemo {}

@Component({
  selector: 'app-ch10-submission-demo',
  imports: [SubmissionFormComponent],
  template: `
    <app-ch10-submission-form />
    <p class="note">
      Submit a valid email to see the success flow (~0.9 s); include the word
      <code>fail</code> in the address to trigger the <code>catchError</code> branch. In both
      cases <code>finalize</code> re-enables the button.
    </p>
  `,
  styles: `.note { color: #5a5f7d; font-size: 13px; }`,
})
export class Ch10SubmissionDemo {}
