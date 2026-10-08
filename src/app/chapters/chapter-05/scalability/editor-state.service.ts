import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class EditorStateService implements OnDestroy {
  draft = '';

  constructor() {
    console.log('EditorStateService created (route/host-scoped instance)');
  }

  ngOnDestroy() {
    console.log('EditorStateService destroyed (scope deactivated)');
  }
}
