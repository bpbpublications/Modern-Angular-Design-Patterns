import { Component } from '@angular/core';
import { DemoCard } from '../../shared/demo-card';
import { ConsolePanel } from '../../shared/console-panel';
import {
  StandaloneBlocksDemo,
  ComposingFeaturesDemo,
  DirectivesPipesDemo,
  MigrationDemo,
  ProviderScopesDemo,
  ProviderPatternDemo,
  SharedFunctionalityDemo,
  LazyLoadingDemo,
  RouteScopedProvidersDemo,
  TestingDemo,
  TeamCollaborationDemo,
  RoutingOwnershipDemo,
} from './chapter-05-demos';

@Component({
  selector: 'app-chapter-05-page',
  imports: [
    DemoCard,
    ConsolePanel,
    StandaloneBlocksDemo,
    ComposingFeaturesDemo,
    DirectivesPipesDemo,
    MigrationDemo,
    ProviderScopesDemo,
    ProviderPatternDemo,
    SharedFunctionalityDemo,
    LazyLoadingDemo,
    RouteScopedProvidersDemo,
    TestingDemo,
    TeamCollaborationDemo,
    RoutingOwnershipDemo,
  ],
  templateUrl: './chapter-05-page.html',
})
export class Chapter05Page {}
