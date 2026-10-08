import { Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card';
import { ConsolePanel } from '../../shared/console-panel';
import {
  Ch14SingletonDemo,
  Ch14EmployeeFacadeDemo,
  Ch14EmployeeAdapterDemo,
  Ch14AccessStrategyDemo,
  Ch14ProductFacadeDemo,
  Ch14OrderAdapterDemo,
  Ch14FormBuilderDemo,
  Ch14ValidationStrategyDemo,
  Ch14NotificationDemo,
  Ch14MediatorDemo,
  Ch14ObserverDashboardDemo,
  Ch14UnitTestingDemo,
  Ch14E2eDemo,
  Ch14ErrorInterceptorDemo,
  Ch14ErrorHandlerDemo,
  Ch14LoggingDemo,
} from './chapter-14-demos';

@Component({
  selector: 'app-chapter-14-page',
  imports: [
    DemoCard,
    ConsolePanel,
    Ch14SingletonDemo,
    Ch14EmployeeFacadeDemo,
    Ch14EmployeeAdapterDemo,
    Ch14AccessStrategyDemo,
    Ch14ProductFacadeDemo,
    Ch14OrderAdapterDemo,
    Ch14FormBuilderDemo,
    Ch14ValidationStrategyDemo,
    Ch14NotificationDemo,
    Ch14MediatorDemo,
    Ch14ObserverDashboardDemo,
    Ch14UnitTestingDemo,
    Ch14E2eDemo,
    Ch14ErrorInterceptorDemo,
    Ch14ErrorHandlerDemo,
    Ch14LoggingDemo,
  ],
  templateUrl: './chapter-14-page.html',
})
export class Chapter14Page {}
