import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FeatureService {
  private flags = {
    enableBeta: true,
    showReports: false
  };

  isFeatureEnabled(flag: keyof typeof this.flags): boolean {
    return this.flags[flag];
  }
}
