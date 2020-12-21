import React, { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  createStyles,
  ListItem,
  ListItemAvatar,
  ListItemText,
}
  from '@material-ui/core';
import { chatRoomI, messageI } from '../interfaces/chat';
import { UserContext } from '../context/UserContext';
import { getChatroomName } from '../utils/chat';
import network from '../utils/network';

type chatRoomProps = {
  chatroom: chatRoomI;
  openChatRoom: (chatroom: chatRoomI) => void
}

const InlineChatRoom: React.FC<chatRoomProps> = ({ chatroom, openChatRoom }) => {
  const context = useContext(UserContext);
  const [lastMessage, setLastMessage] = useState<messageI | null>(null);

  const fetchFirstMessage = async () => {
    try {
      const { data } = await network.get(`http://localhost:3002/api/v1/messenger/chatrooms/${chatroom.id}/lastMessage`);
      setLastMessage(data);
    } catch (err) {
      setTimeout(fetchFirstMessage, 3000);
    }
  };

  useEffect(() => {
    fetchFirstMessage();
  }, []);

  return (
    <React.Fragment key={chatroom.id}>
      <ListItem button onClick={() => { openChatRoom(chatroom); }}>
        <ListItemAvatar>
          <Avatar alt="Profile Picture" src="https://picsum.photos/150/150" />
        </ListItemAvatar>
        <ListItemText
          primary={getChatroomName(chatroom.name, context.name)}
          secondary={lastMessage?.message}
        />
      </ListItem>
    </React.Fragment>
  );
};

export default InlineChatRoom;
