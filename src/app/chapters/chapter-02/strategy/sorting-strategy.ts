import { Injectable } from '@angular/core';

export abstract class SortingStrategy {
  abstract sort(data: number[]): number[];
}

@Injectable({ providedIn: 'root' })
export class BubbleSortStrategy implements SortingStrategy {
  sort(data: number[]): number[] {
    return data.sort((a, b) => a - b);
  }
}

@Injectable({ providedIn: 'root' })
export class QuickSortStrategy implements SortingStrategy {
  sort(data: number[]): number[] {
    // Naive, functional-style quicksort using array filtering, for
    // demonstration purposes. In practice, a more efficient in-place
    // algorithm would be preferred.
    if (data.length <= 1) return data;
    const [pivot, ...rest] = data;
    const left = rest.filter(x => x < pivot);
    const right = rest.filter(x => x >= pivot);
    return [...this.sort(left), pivot, ...this.sort(right)];
  }
}
