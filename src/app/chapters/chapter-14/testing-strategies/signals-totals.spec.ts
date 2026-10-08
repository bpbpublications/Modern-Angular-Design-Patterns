import { signal, computed } from '@angular/core';
import { it, expect } from 'vitest';

it('computes totals with signals', () => {
  const qty = signal(2);
  const price = signal(10);
  const total = computed(() => qty() * price());

  expect(total()).toBe(20);
  qty.set(3);
  expect(total()).toBe(30);
});
