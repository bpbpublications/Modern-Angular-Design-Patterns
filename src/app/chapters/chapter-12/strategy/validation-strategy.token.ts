// validation-strategy.token.ts
import { InjectionToken } from '@angular/core';
import { ValidationStrategy } from './validation-strategy';

export const VALIDATION_STRATEGY = new InjectionToken<ValidationStrategy>('VALIDATION_STRATEGY');
