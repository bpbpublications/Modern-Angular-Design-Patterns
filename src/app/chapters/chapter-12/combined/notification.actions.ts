import { createAction, props } from '@ngrx/store';

export const loadNotifications = createAction('[Notifications] Load Notifications', props<{ message: string }>());
