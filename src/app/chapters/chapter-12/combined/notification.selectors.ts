import { AppState } from './app-state';
import { Notification } from './notification.facade';

export const selectAllNotifications = (state: AppState): Notification[] => state.notifications;
