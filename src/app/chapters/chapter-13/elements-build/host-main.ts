// ============================================================================
// REFERENCE FILE ONLY: Providing Shared Services At The Shell Level
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The real application bootstraps from src/main.ts.
// ============================================================================
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../dynamic-di/app/app.component';
import { LoggingService } from '../dynamic-di/shared/logging.service';
import { ConsoleLoggingService } from '../dynamic-di/shared/console-logging.service';

bootstrapApplication(AppComponent, {
  providers: [{ provide: LoggingService, useClass: ConsoleLoggingService }]
});
