import { Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card';
import { ConsolePanel } from '../../shared/console-panel';
import {
  StartupDemo,
  SignalsDemo,
  FacadeIntroDemo,
  SingletonDemo,
  SrpDemo,
  OcpDemo,
  LspDemo,
  IspDemo,
  DipDemo,
  FacadeDemo,
  FactoryDemo,
  TestabilityDemo,
  ObserverDemo,
  LazyDemo,
  MvvmDemo,
} from './chapter-01-demos';

@Component({
  selector: 'app-chapter-01-page',
  imports: [
    DemoCard,
    ConsolePanel,
    StartupDemo,
    SignalsDemo,
    FacadeIntroDemo,
    SingletonDemo,
    SrpDemo,
    OcpDemo,
    LspDemo,
    IspDemo,
    DipDemo,
    FacadeDemo,
    FactoryDemo,
    TestabilityDemo,
    ObserverDemo,
    LazyDemo,
    MvvmDemo,
  ],
  templateUrl: './chapter-01-page.html',
})
export class Chapter01Page {}
