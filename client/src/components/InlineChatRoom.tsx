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

type chatRoomProps = {
  socket: any;
  chatRoomId: string;
  openChatRoom: (roomId: string) => void
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

const InlineChatRoom: React.FC<chatRoomProps> = ({ socket, chatRoomId, openChatRoom }) => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const messageRef = useRef<any>();
  const classes = useStyles();

  const getMessages = async () => {
    try {
      const { data } = await network.get(`http://localhost:3002/messenger/chatroom/${chatRoomId}`);
      setMessages(data);
    } catch (err) {
      setTimeout(getMessages, 3000);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (message: messageType) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', {
        chatRoomId,
      });
    }

    return () => {
      if (socket) {
        socket.emit('leaveRoom', {
          chatRoomId,
        });
      }
    };
  }, []);

  return (
    <React.Fragment key={chatRoomId}>
      {/* <ListSubheader className={classes.subheader}>Date</ListSubheader> */}
      <ListItem button onClick={() => { openChatRoom(chatRoomId); console.log(chatRoomId); }}>
        <ListItemAvatar>
          <Avatar alt="Profile Picture" src="https://picsum.photos/150/150" />
        </ListItemAvatar>
        <ListItemText primary={chatRoomId} secondary="last message" />
      </ListItem>
    </React.Fragment>
  );
};

export default InlineChatRoom;
