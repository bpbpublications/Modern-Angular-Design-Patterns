import { Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card';
import { ConsolePanel } from '../../shared/console-panel';
import {
  ServiceLayerDemo,
  ServiceInServiceDemo,
  DiHttpDemo,
  InjectionTokenDemo,
  SingletonDemo,
  IteratorDemo,
  IteratorRxjsDemo,
} from './chapter-04-demos';

@Component({
  selector: 'app-chapter-04-page',
  imports: [
    DemoCard,
    ConsolePanel,
    ServiceLayerDemo,
    ServiceInServiceDemo,
    DiHttpDemo,
    InjectionTokenDemo,
    SingletonDemo,
    IteratorDemo,
    IteratorRxjsDemo,
  ],
  templateUrl: './chapter-04-page.html',
})
export class Chapter04Page {}
