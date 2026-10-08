// ============================================================================
// REFERENCE FILE ONLY: Registering MyWidgetComponent As A Custom Element
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The demo host performs the same registration exactly once, guarded by
// customElements.get().
// ============================================================================
// main.ts
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { MyWidgetComponent } from './my-widget.component';

(async () => {
  const app = await createApplication({
    providers: [
      // shared services for the element (logging/auth/config), if any
    ]
  });

  const el = createCustomElement(MyWidgetComponent, { injector: app.injector });
  customElements.define('my-widget', el);
})();
