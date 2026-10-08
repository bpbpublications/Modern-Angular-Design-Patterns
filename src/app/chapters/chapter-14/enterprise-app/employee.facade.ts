import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Employee } from './employee.model';
import { loadEmployeeProfile } from './employee.actions';
import { selectEmployeeProfile } from './employee.selectors';

@Injectable({ providedIn: 'root' })
export class EmployeeFacade {
  constructor(private store: Store) {}
  getProfile(): Observable<Employee> {
    return this.store.select(selectEmployeeProfile);
  }
  loadProfile(id: string) {
    this.store.dispatch(loadEmployeeProfile({ id }));
  }
}
