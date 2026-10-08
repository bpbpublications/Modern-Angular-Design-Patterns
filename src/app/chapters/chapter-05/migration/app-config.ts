import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
  featureFlags: Record<string, boolean>;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

export const environment = {
  config: {
    apiUrl: 'https://api.example.com',
    featureFlags: { darkMode: true },
  } satisfies AppConfig,
};
