import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UIEventMediator {
  private sidebarToggle$ = new Subject<boolean>();

  toggleSidebar(state: boolean) {
    this.sidebarToggle$.next(state);
  }

  onSidebarToggle(): Observable<boolean> {
    return this.sidebarToggle$.asObservable();
  }
}
