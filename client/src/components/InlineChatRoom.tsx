import React from 'react';
import {
  Avatar,
  createStyles,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
}
  from '@material-ui/core';
import { chatRoomI } from '../interfaces/chat';

type chatRoomProps = {
  chatroom: chatRoomI;
  openChatRoom: (chatroom: chatRoomI) => void
}

const InlineChatRoom: React.FC<chatRoomProps> = ({ chatroom, openChatRoom }) => {

  return (
    <React.Fragment key={chatroom.id}>
      <ListItem button onClick={() => { openChatRoom(chatroom); }}>
        <ListItemAvatar>
          <Avatar alt="Profile Picture" src="https://picsum.photos/150/150" />
        </ListItemAvatar>
        <ListItemText primary={chatroom.name} secondary="here will be the last message" />
      </ListItem>
    </React.Fragment>
  );
};

export default InlineChatRoom;
