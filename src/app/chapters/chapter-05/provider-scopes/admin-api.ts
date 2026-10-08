import { Injectable, InjectionToken } from '@angular/core';

export interface AdminApi {
  loadStats(): string;
}

export const ADMIN_API = new InjectionToken<AdminApi>('ADMIN_API');

@Injectable()
export class AdminHttpService implements AdminApi {
  constructor() {
    console.log('AdminHttpService created (route/host-scoped instance)');
  }

  loadStats(): string {
    return '42 active admins';
  }
}
