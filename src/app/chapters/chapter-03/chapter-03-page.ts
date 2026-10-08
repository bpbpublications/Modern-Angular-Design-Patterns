import { Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card';
import { ConsolePanel } from '../../shared/console-panel';
import {
  BasicComponentDemo,
  CompositionDemo,
  InputDemo,
  OutputDemo,
  ViewChildDemo,
  ButtonDemo,
  OnPushAlertDemo,
  CardProjectionDemo,
  ModalProjectionDemo,
  EmptyAwareDemo,
} from './chapter-03-demos';

@Component({
  selector: 'app-chapter-03-page',
  imports: [
    DemoCard,
    ConsolePanel,
    BasicComponentDemo,
    CompositionDemo,
    InputDemo,
    OutputDemo,
    ViewChildDemo,
    ButtonDemo,
    OnPushAlertDemo,
    CardProjectionDemo,
    ModalProjectionDemo,
    EmptyAwareDemo,
  ],
  templateUrl: './chapter-03-page.html',
})
export class Chapter03Page {}
