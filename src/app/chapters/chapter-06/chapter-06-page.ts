import { Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card';
import { ConsolePanel } from '../../shared/console-panel';
import {
  PullPushDemo,
  BasicObservableDemo,
  DeclarativeDemo,
  SignalsComponentDemo,
  SubjectsDemo,
  DebounceThrottleDemo,
  ErrorHandlingDemo,
  EventBusDemo,
  CombineStreamsDemo,
  SubscriptionsDemo,
  HybridSearchDemo,
  ReactiveFormsDemo,
  UserFacadeDemo,
} from './chapter-06-demos';

@Component({
  selector: 'app-chapter-06-page',
  imports: [
    DemoCard,
    ConsolePanel,
    PullPushDemo,
    BasicObservableDemo,
    DeclarativeDemo,
    SignalsComponentDemo,
    SubjectsDemo,
    DebounceThrottleDemo,
    ErrorHandlingDemo,
    EventBusDemo,
    CombineStreamsDemo,
    SubscriptionsDemo,
    HybridSearchDemo,
    ReactiveFormsDemo,
    UserFacadeDemo,
  ],
  templateUrl: './chapter-06-page.html',
})
export class Chapter06Page {}
