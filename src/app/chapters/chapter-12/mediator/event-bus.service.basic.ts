// ============================================================================
// REFERENCE FILE ONLY: Alternate (String-Keyed) Printing Of EventBusService
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The book shows the event bus twice; the demos use the enum-typed revision in
// event-bus.service.ts instead.
// ============================================================================
import { Injectable } from '@angular/core';
import { Subject, Observable, filter, map } from 'rxjs';

export interface AppEvent { type: string; payload?: unknown; }

@Injectable({ providedIn: 'root' })
export class EventBusService {
  private readonly events$ = new Subject<AppEvent>();
  emit(event: AppEvent) { this.events$.next(event); }
  on<T = unknown>(type: string): Observable<T> {
    return this.events$.pipe(
      filter(e => e.type === type),
      map(e => e.payload as T)
    );
  }
}
