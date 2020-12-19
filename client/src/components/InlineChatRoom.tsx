import React, {
  useState,
  useRef,
  SetStateAction,
  Dispatch,
  useEffect,
} from 'react';
import {
  Avatar,
  createStyles,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  makeStyles,
  Theme,
}
  from '@material-ui/core';
import io from 'socket.io-client';
import { UserContext } from '../context/UserContext';
import network from '../utils/network';

type chatroomType = {
  id: string;
  name: string;
  participants: string[]
}

type chatRoomProps = {
  socket: any;
  chatroom: chatroomType;
  openChatRoom: (chatroom: chatroomType) => void
}

type messageType = {
  message: string;
  name: string;
  id: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  subheader: {
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
}));

const InlineChatRoom: React.FC<chatRoomProps> = ({ socket, chatroom, openChatRoom }) => {
  const classes = useStyles();

  return (
    <React.Fragment key={chatroom.id}>
      {/* <ListSubheader className={classes.subheader}>Date</ListSubheader> */}
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
