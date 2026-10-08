import { BehaviorSubject } from 'rxjs';

export const user = { isLoggedIn: true };

export function fetchData(): Promise<string[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(['alpha', 'beta', 'gamma']), 300),
  );
}

export function render(data: unknown): void {
  console.log('render:', data);
}

export const authService = {
  isLoggedIn$: new BehaviorSubject<boolean>(true),
};
