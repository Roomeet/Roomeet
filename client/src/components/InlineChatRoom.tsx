import React, { useContext } from 'react';
import {
  Avatar,
  createStyles,
  ListItem,
  ListItemAvatar,
  ListItemText,
}
  from '@material-ui/core';
import { chatRoomI } from '../interfaces/chat';
import { UserContext } from '../context/UserContext';
import { getChatroomName } from '../utils/chat';

type chatRoomProps = {
  chatroom: chatRoomI;
  openChatRoom: (chatroom: chatRoomI) => void
}

const InlineChatRoom: React.FC<chatRoomProps> = ({ chatroom, openChatRoom }) => {
  const context = useContext(UserContext);

  return (
    <React.Fragment key={chatroom.id}>
      <ListItem button onClick={() => { openChatRoom(chatroom); }}>
        <ListItemAvatar>
          <Avatar alt="Profile Picture" src="https://picsum.photos/150/150" />
        </ListItemAvatar>
        <ListItemText primary={getChatroomName(chatroom.name, context.name)} secondary="here will be the last message" />
      </ListItem>
    </React.Fragment>
  );
};

export default InlineChatRoom;
