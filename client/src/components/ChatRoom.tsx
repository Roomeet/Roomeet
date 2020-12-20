import {
  Avatar,
  Badge,
  createStyles,
  CssBaseline,
  IconButton,
  Input,
  List,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import SocketContext from '../context/socketContext';
import { UserContext } from '../context/UserContext';
import { messageI, chatRoomI } from '../interfaces/chat';
import { getChatroomName } from '../utils/chat';
import network from '../utils/network';

type chatRoomProps = {
  chatroom: chatRoomI;
  closeChatRoom: (roomId: chatRoomI) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    position: 'absolute',
    maxWidth: '400px',
    top: '50px',
    right: '200px',
    zIndex: 10,
    padding: '5px',
  },
  ownMessage: {
    backgroundColor: 'rgb(0,132,255)',
    position: 'relative',
    padding: '5px',
    margin: '5px',
    marginLeft: 'auto',
    width: 'fit-content',
    maxWidth: '10rem',
  },
  otherMessage: {
    backgroundColor: 'rgb(228,230,235)',
    position: 'relative',
    marginRight: 'auto',
    padding: '5px',
    margin: '5px',
    width: 'fit-content',
    maxWidth: '10rem',
  },
  header: {
    padding: theme.spacing(2, 2, 0),
    position: 'relative',
    top: 0,
  },
  list: {
    overflowY: 'scroll',
    maxHeight: '200px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  input: {
  },
  sendButton: {
    flexGrow: 1,
  },
  submit: {
    flexGrow: 1,
  },
}));

const ChatRoom: React.FC<chatRoomProps> = ({ chatroom, closeChatRoom }) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [badgeInvisible, setBadgeInvisible] = useState<boolean>(true);
  const [messages, setMessages] = useState<messageI[]>([]);
  const messageRef = useRef<HTMLInputElement>(null);
  const context = useContext(UserContext);
  const socket = useContext(SocketContext);

  const sendMessage = () => {
    // console.log('socket....', socket, 'reffff', messageRef);
    if (socket && messageRef) {
      socket.emit('chatroomMessage', {
        chatroomId: chatroom.id,
        userId: context.id,
        message: messageRef?.current?.value,
      });
      if (messageRef?.current) messageRef.current.value = '';
    }
  };

  const getMessages = async () => {
    try {
      const { data } = await network.get(`http://localhost:3002/api/v1/messenger/messages/chatroom/${chatroom.id}`);
      setMessages(data);
    } catch (err) {
      setTimeout(getMessages, 3000);
    }
  };

  useEffect(() => {
    getMessages();
    if (socket) {
    // trig the enteredRoom event
      socket.emit('EnteredRoom', {
        chatRoomId: chatroom.id,
      });

      // define the new message event
      socket.on('newMessage', (message: messageI) => {
        setMessages(((prev) => [...prev, message]));
      });
    }

    // trig the exitedRoom event on unmount
    return () => {
      if (socket) {
        socket.emit('exitedRoom', {
          chatRoomId: chatroom.id,
        });
      }
    };
  }, []);

  return (
    <div className="ChatRoom">
      <div className="chat-avatar">
        <IconButton
          onMouseEnter={() => setBadgeInvisible(false)}
          onMouseLeave={() => setBadgeInvisible(true)}
          onClick={() => { setOpen((prev) => !prev); }}
        >
          <Avatar>
            {getChatroomName(chatroom.name, context.name)[0]}
          </Avatar>
        </IconButton>
        <Badge
          badgeContent="X"
          onMouseEnter={() => setBadgeInvisible(false)}
          onMouseLeave={() => setBadgeInvisible(true)}
          color="secondary"
          style={{ marginLeft: '-15px' }}
          onClick={() => { closeChatRoom(chatroom); }}
          invisible={badgeInvisible}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <IconButton />
        </Badge>
      </div>
      { open && (
        <React.Fragment>
          <CssBaseline />
          <Paper square className={classes.paper}>
            <Typography
              onClick={() => { setOpen((prev) => !prev); }}
              className={classes.header}
              variant="h5"
              gutterBottom
            >
              {getChatroomName(chatroom.name, context.name)}
            </Typography>
            <List className={classes.list}>
              {messages[0] ? messages.map((message) => (
                <Paper
                  key={message.userId}
                  className={
                    message.userId === context.id ? classes.ownMessage : classes.otherMessage
                  }
                >
                  <Typography variant="body2">
                    {message.message}
                  </Typography>
                </Paper>
              )) : <div>no messages</div>}
            </List>
            <div className="chatroomActions">
              <div className={classes.submit}>
                <Input
                  className={classes.input}
                  type="text"
                  name="message"
                  placeholder="Type here..."
                  inputRef={messageRef}
                />
                <IconButton
                  className={classes.sendButton}
                  onClick={() => { sendMessage(); }}
                >
                  <SendIcon />
                </IconButton>
              </div>
            </div>
          </Paper>
        </React.Fragment>
      )}
    </div>
  );
};

export default ChatRoom;
