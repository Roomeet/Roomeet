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
import io from 'socket.io-client';
import { UserContext } from '../context/UserContext';
import network from '../utils/network';

type chatRoomProps = {
  socket: any;
  chatRoomId: string;
  closeChatRoom: (roomId: string) => void
}

type messageType = {
  message: string;
  name: string;
  userId: string;
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
    // position: 'relative',
    // bottom: 0,
  },
  sendButton: {
    flexGrow: 1,
  },
  submit: {
    flexGrow: 1,
  },
}));

// const messages: messageType[] = [
//   {message: 'hey', name: 'Itay', userId: '1234' },
//   { message: 'Hi!', name: 'Liam', userId: '123456' },
//   { message: 'I wanna live with you', name: 'Itay', userId: '1234' },
//   { message: 'Where??', name: 'Liam', userId: '1234' },
//   { message: 'TLV BABY', name: 'Itay', userId: '123456' },
//   { message: 'You just found yourself a Roomeet!', name: 'Liam', userId: '1234' }
// ];

const ChatRoom: React.FC<chatRoomProps> = ({ socket, chatRoomId, closeChatRoom }) => {
  // const [messages, setMessages] = useState<messageType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [badgeInvisible, setBadgeInvisible] = useState<boolean>(true);
  const [messages, setMessages] = useState<messageType[]>([]);
  const messageRef = useRef<any>();
  const user = useContext(UserContext);
  const classes = useStyles();

  const sendMessage = () => {
    if (socket) {
      console.log('in');
      socket.emit('chatroomMessage', {
        chatRoomId,
        message: messageRef.current.value,
      });

      messageRef.current.value = '';
    }
  };

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
    <div className="ChatRoom">
      <div className="chat-avatar">
        <IconButton
          onMouseEnter={() => setBadgeInvisible(false)}
          onMouseLeave={() => setBadgeInvisible(true)}
          onClick={() => { setOpen((prev) => !prev); }}
        >
          <Avatar>
            {chatRoomId[0]}
          </Avatar>
        </IconButton>
        <Badge
          badgeContent="X"
          onMouseEnter={() => setBadgeInvisible(false)}
          onMouseLeave={() => setBadgeInvisible(true)}
          color="secondary"
          style={{ marginLeft: '-15px' }}
          onClick={() => { closeChatRoom(chatRoomId); }}
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
              chatroom name
            </Typography>
            <List className={classes.list}>
              {messages[0] ? messages.map((message) => (
                <Paper
                  key={message.userId}
                  className={
                    message.name === 'Liam' ? classes.ownMessage : classes.otherMessage
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
                <IconButton className={classes.sendButton} onClick={sendMessage}>
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
