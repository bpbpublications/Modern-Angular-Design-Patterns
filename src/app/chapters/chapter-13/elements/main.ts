// ============================================================================
// REFERENCE FILE ONLY: Registering UserCardComponent As A Custom Element
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The demo host performs the same registration exactly once, guarded by
// customElements.get().
// ============================================================================
// main.ts
import { createApplication } from '@angular/platform-browser';
import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { UserCardComponent } from './user-card.component';

(async () => {
  const app = await createApplication({ providers: [] });
  const el = createCustomElement(UserCardComponent, { injector: app.injector as Injector });
  customElements.define('user-card-element', el);
})();
