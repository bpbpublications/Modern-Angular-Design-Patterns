import { Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card';
import { ConsolePanel } from '../../shared/console-panel';
import {
  Ch9LazyPatternDemo,
  Ch9StandaloneLazyDemo,
  Ch9PreloadingDemo,
  Ch9ImagesDemo,
  Ch9FeatureFlagsDemo,
} from './chapter-09-demos';

@Component({
  selector: 'app-chapter-09-page',
  imports: [
    DemoCard,
    ConsolePanel,
    Ch9LazyPatternDemo,
    Ch9StandaloneLazyDemo,
    Ch9PreloadingDemo,
    Ch9ImagesDemo,
    Ch9FeatureFlagsDemo,
  ],
  templateUrl: './chapter-09-page.html',
})
export class Chapter09Page {}
