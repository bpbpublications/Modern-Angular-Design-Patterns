import { Subject, debounceTime } from 'rxjs';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('debounces search input', () => {
  const input$ = new Subject<string>();
  const results: string[] = [];

  input$.pipe(debounceTime(300)).subscribe(v => results.push(v));

  input$.next('a');
  input$.next('ab');
  vi.advanceTimersByTime(300);
  expect(results).toEqual(['ab']);
});
