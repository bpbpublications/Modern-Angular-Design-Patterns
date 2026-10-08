import { Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card';
import { ConsolePanel } from '../../shared/console-panel';
import {
  Ch12ApiServiceDemo,
  Ch12FacadeMultiDemo,
  Ch12UiMediatorDemo,
  Ch12EventBusDemo,
  Ch12ValidationStrategyDemo,
  Ch12StrategyFactoryDemo,
  Ch12EditStrategyDemo,
  Ch12VisitorDemo,
  Ch12CombinedDemo,
} from './chapter-12-demos';

@Component({
  selector: 'app-chapter-12-page',
  imports: [
    DemoCard,
    ConsolePanel,
    Ch12ApiServiceDemo,
    Ch12FacadeMultiDemo,
    Ch12UiMediatorDemo,
    Ch12EventBusDemo,
    Ch12ValidationStrategyDemo,
    Ch12StrategyFactoryDemo,
    Ch12EditStrategyDemo,
    Ch12VisitorDemo,
    Ch12CombinedDemo,
  ],
  templateUrl: './chapter-12-page.html',
})
export class Chapter12Page {}
