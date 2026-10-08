// ============================================================================
// REFERENCE FILE ONLY: Navigating Programmatically With Parameters
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The snippets target absolute paths ('/user', '/search') 
// that exist at the root of the book's standalone app, whereas this demo 
// mounts the equivalent routes under /chapter-08/router-demo. 
// The demo host performs the same navigations with that prefix.
// ============================================================================
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationSnippets {
  private router = inject(Router);

  navigateToUser(user: { id: number }) {
    this.router.navigate(['/user', user.id]);
  }

  navigateToSearch() {
    this.router.navigate(['/search'], { queryParams: { term: 'angular', page: 2 } });
  }
}
