import { Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card';
import { ConsolePanel } from '../../shared/console-panel';
import {
  Ch8SimpleRoutesDemo,
  Ch8RouteConfigDemo,
  Ch8DynamicRoutesDemo,
  Ch8GuardsDemo,
  Ch8ComplexRoutingDemo,
  Ch8LifecycleDemo,
} from './chapter-08-demos';

@Component({
  selector: 'app-chapter-08-page',
  imports: [
    DemoCard,
    ConsolePanel,
    Ch8SimpleRoutesDemo,
    Ch8RouteConfigDemo,
    Ch8DynamicRoutesDemo,
    Ch8GuardsDemo,
    Ch8ComplexRoutingDemo,
    Ch8LifecycleDemo,
  ],
  templateUrl: './chapter-08-page.html',
})
export class Chapter08Page {}
