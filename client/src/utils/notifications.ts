import { NotificationI } from '../interfaces/notification';

export const getUnseenNotificationsLength = (notifications: NotificationI[] | null) => {
  if (notifications?.length) {
    const unseenNotifications = notifications.filter((notification) => !notification.seen);
    return unseenNotifications.length;
  }
  return 0;
};
