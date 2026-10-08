import { Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card';
import { ConsolePanel } from '../../shared/console-panel';
import {
  Ch10TemplateLoginDemo,
  Ch10ReactiveLoginDemo,
  Ch10FormStateDemo,
  Ch10ValidatorsDemo,
  Ch10BuilderDemo,
  Ch10StrategyDemo,
  Ch10SubmissionDemo,
} from './chapter-10-demos';

@Component({
  selector: 'app-chapter-10-page',
  imports: [
    DemoCard,
    ConsolePanel,
    Ch10TemplateLoginDemo,
    Ch10ReactiveLoginDemo,
    Ch10FormStateDemo,
    Ch10ValidatorsDemo,
    Ch10BuilderDemo,
    Ch10StrategyDemo,
    Ch10SubmissionDemo,
  ],
  templateUrl: './chapter-10-page.html',
})
export class Chapter10Page {}
