import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import { NotificationActions, notificationMessages } from './commonMessages';

export interface Notification {
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

interface NotificationContextProps {
  notification: Notification | null;
  setNotification: (notification: Notification | null) => void;
  triggerNotification: (action: NotificationActions) => void;
}

const defaultNotificationContextValue: NotificationContextProps = {
  notification: null,
  setNotification: () => undefined,
  triggerNotification: () => undefined,
};

export const NotificationContext =
  createContext<NotificationContextProps | null>(
    defaultNotificationContextValue,
  );

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const triggerNotification = useCallback(
    (action: NotificationActions): void => {
      const notification = notificationMessages[action];
      if (notification) {
        setNotification(notification);
      } else {
        console.error(`No message defined for action: ${action}`);
      }
    },
    [],
  );

  useEffect(() => {
    if (notification !== null) {
      const timeoutId = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider
      value={{ notification, setNotification, triggerNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === null) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }

  return context;
}
