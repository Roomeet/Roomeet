import {
  Avatar,
  Badge,
  createStyles,
  CssBaseline,
  IconButton,
  List,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
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
  id: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  messenger: {
    position: 'absolute',
    maxWidth: '400px',
    top: '50px',
    right: '100px',
    zIndex: 10,
  },
  header: {
    padding: theme.spacing(2, 2, 0),
    position: 'relative',
    top: 0,
  },
  paper: {
  },
  list: {
    overflowY: 'scroll',
    maxHeight: '400px',
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    position: 'relative',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

const ChatRoom: React.FC<chatRoomProps> = ({ socket, chatRoomId, closeChatRoom }) => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [badgeInvisible, setBadgeInvisible] = useState<boolean>(true);
  const messageRef = useRef<any>();
  const user = useContext(UserContext);
  const classes = useStyles();

  const sendMessage = () => {
    if (socket) {
      // console.log('sended');
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
    console.log('messages::::: ', messages);
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
      { open ? (
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
                <div key={message.id} className="message">
                  <span
                    className={
                      user.id === message.id ? 'ownMessage' : 'otherMessage'
                    }
                  >
                    {message.name}
                    :
                  </span>
                  {' '}
                  {message.message}
                </div>
              )) : <div>no messages</div>}
            </List>
            <div className="chatroomActions">
              <div>
                <input
                  type="text"
                  name="message"
                  placeholder="Say something!"
                  ref={messageRef}
                />
              </div>
              <div>
                <button className="join" onClick={sendMessage}>
                  Send
                </button>
              </div>
            </div>
          </Paper>
        </React.Fragment>
      )
        : (
          <>
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
          </>
        )}
    </div>
  );
};

export default ChatRoom;
