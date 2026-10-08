import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';

export interface User {
  name: string;
}

export interface SessionState {
  currentUser: User | null;
}

export interface AppState {
  session: SessionState;
}

export const setCurrentUser = createAction(
  '[Session] Set Current User',
  props<{ user: User | null }>()
);

const initialState: SessionState = { currentUser: null };

export const sessionReducer = createReducer(
  initialState,
  on(setCurrentUser, (state, { user }) => ({ ...state, currentUser: user }))
);

export const selectSessionState = createFeatureSelector<SessionState>('session');

export const selectCurrentUser = createSelector(selectSessionState, (state) => state.currentUser);
