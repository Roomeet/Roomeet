import React, { useState } from 'react';
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
}

const InlineNotification: React.FC<chatRoomProps> = ({ notification }) => {
  const [seen, setSeen] = useState<boolean>(notification?.seen);

  const seeNotification = async (notificationId: string) => {
    await network.get(`http://localhost:3002/api/v1/notifications/${notificationId}/seen`);
    setSeen(false);
  };

  return (
    <React.Fragment key={notification.id}>
      <ListItem button onClick={() => { seeNotification(notification.id); }}>
        {/* </Badge> */}
        <ListItemText
          primary="New Notification"
          secondary={notification.content}
        />
        { seen && <Badge color="secondary" badgeContent="" variant="dot" />}
      </ListItem>
    </React.Fragment>
  );
};

export default InlineNotification;
