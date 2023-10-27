import { Notification } from './NotificationContext';

export const notificationMessages: Record<string, Notification> = {
  clearBoard: { message: 'Board cleared successfully', severity: 'success' },
  addItem: { message: 'Activity added successfully', severity: 'success' },
  lockModel: { message: 'Model locked successfully', severity: 'success' },
  unlockModel: {
    message: 'Model unlocked successfully',
    severity: 'success',
  },
  deleteItem: { message: 'Activity deleted successfully', severity: 'success' },
  cloneItem: { message: 'Activity cloned successfully', severity: 'success' },
  noItems: { message: 'No activities were selected', severity: 'warning' },
  modelIsLocked: {
    message: 'Can not perform an action, the model is Locked',
    severity: 'error',
  },
} as const;

export type NotificationActions = keyof typeof notificationMessages;
