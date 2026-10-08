import { Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card';
import { ConsolePanel } from '../../shared/console-panel';
import {
  ServiceCartDemo,
  StoreCartDemo,
  EffectsDemo,
  SelectorsDemo,
  FacadeCartDemo,
} from './chapter-07-demos';

@Component({
  selector: 'app-chapter-07-page',
  imports: [
    DemoCard,
    ConsolePanel,
    ServiceCartDemo,
    StoreCartDemo,
    EffectsDemo,
    SelectorsDemo,
    FacadeCartDemo,
  ],
  templateUrl: './chapter-07-page.html',
})
export class Chapter07Page {}
