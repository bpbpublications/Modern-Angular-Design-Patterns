// ============================================================================
// REFERENCE FILE ONLY: Enabling Zoneless Mode (Bootstrap-Level Configuration)
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// This demo app runs with zone.js change detection and bootstraps from
// src/main.ts.
// ============================================================================
import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection()],
});
