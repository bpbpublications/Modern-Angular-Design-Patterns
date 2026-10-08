// ============================================================================
// REFERENCE FILE ONLY: Providing LoggingService And Capturing The Shell Injector
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The real application bootstraps from src/main.ts — the demo host mirrors
// setAppInjector with a child environment injector instead.
// ============================================================================
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { setAppInjector } from './app-injector';
import { LoggingService } from './shared/logging.service';
import { ConsoleLoggingService } from './shared/console-logging.service';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: LoggingService, useClass: ConsoleLoggingService }
  ]
}).then(appRef => {
  setAppInjector(appRef.injector);
});
