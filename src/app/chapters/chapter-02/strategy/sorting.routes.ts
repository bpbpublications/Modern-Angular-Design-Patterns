// ============================================================================
// REFERENCE FILE ONLY: Per-Route Strategy Overrides
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The demo instead provides the strategies at component level (see
// chapter-02-demos.ts).
// ============================================================================
import { Routes } from '@angular/router';
import { SortingStrategy, BubbleSortStrategy, QuickSortStrategy } from './sorting-strategy';
import { TableComponent } from './table.component';

// Routes (override per route)
export const routes: Routes = [
  { path: '', component: TableComponent, providers: [{ provide: SortingStrategy, useClass: BubbleSortStrategy }] },
  { path: 'fast', component: TableComponent, providers: [{ provide: SortingStrategy, useClass: QuickSortStrategy }] },
];
