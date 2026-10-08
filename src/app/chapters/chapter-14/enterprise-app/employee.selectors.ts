import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState } from './employee.reducer';

export const selectEmployeeState = createFeatureSelector<EmployeeState>('employee');

export const selectEmployeeProfile = createSelector(selectEmployeeState, (state) => state.profile);

export const selectEmployeeLoading = createSelector(selectEmployeeState, (state) => state.loading);

export const selectEmployeeError = createSelector(selectEmployeeState, (state) => state.error);
