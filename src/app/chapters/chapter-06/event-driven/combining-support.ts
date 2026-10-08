import { BehaviorSubject } from 'rxjs';

export const userService = {
  user$: new BehaviorSubject<string>('Alice'),
};

export const settingsService = {
  theme$: new BehaviorSubject<string>('light'),
};
