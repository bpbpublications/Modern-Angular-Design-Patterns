import { createAction, props } from '@ngrx/store';
import { Employee } from './employee.model';

export const loadEmployeeProfile = createAction(
  '[Employee] Load Employee Profile',
  props<{ id: string }>()
);

export const loadEmployeeProfileSuccess = createAction(
  '[Employee] Load Employee Profile Success',
  props<{ profile: Employee }>()
);

export const loadEmployeeProfileFailure = createAction(
  '[Employee] Load Employee Profile Failure',
  props<{ error: string }>()
);
