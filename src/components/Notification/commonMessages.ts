import { Notification } from './NotificationContext';

export const notificationMessages: Record<string, Notification> = {
  clearBoard: { message: 'Board cleared successfully', severity: 'success' },
  addItem: { message: 'Activity added successfully', severity: 'success' },
  deleteItem: { message: 'Activity deleted successfully', severity: 'success' },
  cloneItem: { message: 'Activity cloned successfully', severity: 'success' },
  noItems: { message: 'No activities were selected', severity: 'warning' },
} as const;

export type NotificationActions = keyof typeof notificationMessages;
