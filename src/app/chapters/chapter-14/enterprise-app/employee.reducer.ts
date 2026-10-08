import { createReducer, on } from '@ngrx/store';
import { Employee } from './employee.model';
import {
  loadEmployeeProfile,
  loadEmployeeProfileFailure,
  loadEmployeeProfileSuccess,
} from './employee.actions';

export interface EmployeeState {
  profile: Employee;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  profile: { id: '', name: 'Unknown', role: 'Unassigned', joinedOn: null },
  loading: false,
  error: null,
};

export const employeeReducer = createReducer(
  initialState,
  on(loadEmployeeProfile, (state) => ({ ...state, loading: true, error: null })),
  on(loadEmployeeProfileSuccess, (state, { profile }) => ({ ...state, profile, loading: false })),
  on(loadEmployeeProfileFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
