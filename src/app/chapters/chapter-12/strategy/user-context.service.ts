// The setter lets the demo flip the runtime preference 
// before the factory provider resolves the strategy.
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserContextService {
  private prefersPhone = false;

  setPrefersPhoneValidation(value: boolean): void {
    this.prefersPhone = value;
  }

  prefersPhoneValidation(): boolean {
    return this.prefersPhone;
  }
}
