// ============================================================================
// REFERENCE FILE ONLY: Auxiliary Routes, Aka Named Outlets — Navigation
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The demo mounts it under /chapter-08/router-demo instead,
// and it shell perform the same navigation with `relativeTo` set to the
// demo's route.
// ============================================================================
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuxNavigationSnippet {
  private router = inject(Router);

  openChatSidebar() {
    this.router.navigate([{ outlets: { sidebar: ['chat'] } }]);
  }
}
