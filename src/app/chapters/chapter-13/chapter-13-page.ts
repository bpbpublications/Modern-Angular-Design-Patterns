import { Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card';
import { ConsolePanel } from '../../shared/console-panel';
import {
  Ch13UserCardElementDemo,
  Ch13SingletonAuthDemo,
  Ch13DynamicDiDemo,
  Ch13MyWidgetDemo,
} from './chapter-13-demos';

@Component({
  selector: 'app-chapter-13-page',
  imports: [
    DemoCard,
    ConsolePanel,
    Ch13UserCardElementDemo,
    Ch13SingletonAuthDemo,
    Ch13DynamicDiDemo,
    Ch13MyWidgetDemo,
  ],
  templateUrl: './chapter-13-page.html',
})
export class Chapter13Page {}
