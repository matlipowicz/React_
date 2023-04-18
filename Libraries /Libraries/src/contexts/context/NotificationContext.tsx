import { createContext, useContext, useState } from 'react';

interface NotificationInterface {
  clear: () => void;
  error: (text: string) => void;
  notification: null | string;
  notificationText: null | string;
  success: (text: string) => void;
}

export const NotificationContext = createContext<NotificationInterface | null>({
  notification: null || '',
  notificationText: null || '',
  success: () => {},
  error: () => {},
  clear: () => {},
});

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationText, setNotificationText] = useState<string | null>(null);

  const success = (text: string) => {
    setNotificationText(text);
    setNotification('success');
  };

  const error = (text: string) => {
    setNotificationText(text);
    setNotification('error');
  };

  const clear = () => {
    setNotificationText(null);
    setNotification(null);
  };

  return (
    <>
      <NotificationContext.Provider
        value={{ notification, notificationText, success, error, clear }}
      >
        {children}
      </NotificationContext.Provider>
    </>
  );
};

export const useNotificationContext = () => {
  const ctx = useContext(NotificationContext);

  if (!ctx) {
    throw new Error("Missing NotificationProvider, it's not wrapped in ThemeProvider");
  }
  return ctx;
};
