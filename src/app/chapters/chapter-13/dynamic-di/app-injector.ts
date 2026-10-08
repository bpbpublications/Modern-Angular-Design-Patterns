// app-injector.ts
import { Injector } from '@angular/core';

let _appInjector: Injector | null = null;

export function setAppInjector(injector: Injector) {
  _appInjector = injector;
}

export function appInjector(): Injector {
  if (!_appInjector) {
    throw new Error('App injector has not been set yet.');
  }
  return _appInjector;
}
