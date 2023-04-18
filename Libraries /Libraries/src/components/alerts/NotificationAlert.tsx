import { useNotificationContext } from 'src/contexts/context/NotificationContext';

import style from './alert.module.css';

export const NotificationAlert = () => {
  const { notification, notificationText } = useNotificationContext();
  return (
    <div
      className={
        notification !== null && notification === 'success'
          ? style['alert-success']
          : style['alert-error']
      }
    >
      {notificationText}
    </div>
  );
};
