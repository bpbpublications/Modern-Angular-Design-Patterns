// ============================================================================
// REFERENCE FILE ONLY: Registering The Element With The Shell's Shared Injector
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// Registration would run at import time — the demo host performs the same
// registration exactly once, guarded by customElements.get().
// ============================================================================
import { createCustomElement } from '@angular/elements';
import { MyElementComponent } from './my-element.component';
import { appInjector } from './app-injector';

const el = createCustomElement(MyElementComponent, { injector: appInjector() });
customElements.define('my-element', el);
