import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Badge,
  ListItem,
  ListItemText,
}
  from '@material-ui/core';
import { NotificationI } from '../interfaces/notification';
import network from '../utils/network';

type chatRoomProps = {
  notification: NotificationI;
  setUnseenNotificationsLength: Dispatch<SetStateAction<number>>;
}

const InlineNotification: React.FC<chatRoomProps> = ({
  notification,
  setUnseenNotificationsLength,
}) => {
  const [seen, setSeen] = useState<boolean>(notification?.seen);

  const seeNotification = async (notificationToSee: NotificationI) => {
    if (!notificationToSee.seen) {
      await network.put(`http://localhost:3002/api/v1/notifications/${notificationToSee.id}/seen`);
      setSeen(true);
      setUnseenNotificationsLength((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return prev;
      });
    }
  };

  return (
    <React.Fragment key={notification.id}>
      <ListItem
        button
        onClick={() => { seeNotification(notification); }}
        style={{ backgroundColor: !seen ? 'rgba(157,168,233,0.4)' : 'white' }}
      >
        <ListItemText
          primary={!seen ? `new ${notification.topic}!` : `${notification.topic}`}
          secondary={notification.content}
        />
        { !seen && <Badge color="primary" badgeContent="" variant="dot" />}
      </ListItem>
    </React.Fragment>
  );
};

export default InlineNotification;
