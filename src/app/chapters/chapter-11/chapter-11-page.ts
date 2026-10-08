import { Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card';
import { ConsolePanel } from '../../shared/console-panel';
import {
  MismatchDemo,
  ModelAdapterDemo,
  ProductAdapterDemo,
  ErrorHandlingDemo,
  SilentRequestDemo,
} from './chapter-11-demos';

@Component({
  selector: 'app-chapter-11-page',
  imports: [
    DemoCard,
    ConsolePanel,
    MismatchDemo,
    ModelAdapterDemo,
    ProductAdapterDemo,
    ErrorHandlingDemo,
    SilentRequestDemo,
  ],
  templateUrl: './chapter-11-page.html',
})
export class Chapter11Page {}
