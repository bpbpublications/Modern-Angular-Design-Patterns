// ============================================================================
// REFERENCE FILE ONLY: Route-Scoped Providers For EditorStateService
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// This route is not mounted in the demo app; the demo hosts EditorPage with the
// same provider on a host component instead. 
// ============================================================================
import { Route } from '@angular/router';
import { EditorStateService } from './editor-state.service';

const editorRoute: Route = {
    path: 'editor',
    loadComponent: () => import('./editor.page').then(m => m.EditorPage),
    providers: [EditorStateService]
};
