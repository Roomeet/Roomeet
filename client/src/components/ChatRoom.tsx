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
import useDetectOutside from '../hooks/useDetectOutside';
import { getImageBase64String } from '../utils/image';

type chatRoomProps = {
  chatroom: chatRoomI;
  closeChatRoom: (roomId: chatRoomI) => void;
  open: boolean;
  openChatroomOnClick: (chatroomId: string) => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    position: 'absolute',
    maxWidth: '400px',
    top: '50px',
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
  badge: {
    marginLeft: '-15px',
    '&:hover':
{ cursor: 'pointer' },
  },
  profilePic: {
    height: '50px',
    width: '50px',
  },
}));

const ChatRoom: React.FC<chatRoomProps> = ({
  chatroom, closeChatRoom, open, openChatroomOnClick,
}) => {
  const classes = useStyles();
  const [badgeInvisible, setBadgeInvisible] = useState<boolean>(true);
  const [messages, setMessages] = useState<messageI[]>([]);
  const [image, setImage] = useState<Buffer>();
  const messageRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const context = useContext(UserContext);
  const socket = useContext(SocketContext);
  const wrapperRef = React.useRef(null);
  console.log(chatroom);
  useDetectOutside(wrapperRef, () => openChatroomOnClick(chatroom), true);

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

  const sendByEnter = (e: any) => {
    if (e.key === 'Enter') {
      sendMessage();
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

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on(`newMessage${chatroom.id}`, (message: messageI) => {
        if (chatroom.participants.includes(message.userId)) {
          const newMessages = [...messages, message];
          setMessages(newMessages);
        }
      });
    }
  }, [messages]);

  const getProfilePicture = async () => {
    const { data } = await network.get(`api/v1/users/basic-info/picture?id=${chatroom.participants[0]}`);
    setImage(data);
  };

  useEffect(() => {
    getMessages();
    if (socket) {
    // trig the enteredRoom event
      socket.emit('EnteredRoom', {
        chatroomId: chatroom.id,
      });
      getProfilePicture();

      // define the new message event
    //   socket.on('newMessage', (message: messageI) => {
    //     setMessages(((prev) => [...prev, message]));
    //   });
    }

    // trig the exitedRoom event on unmount
    return () => {
      if (socket) {
        socket.emit('exitedRoom', {
          chatroomId: chatroom.id,
        });
      }
    };
  }, []);
  useEffect(scrollToBottom, [messages]);

  return (
    <div className="ChatRoom">
      <div className="chat-avatar">
        <IconButton
          onMouseEnter={() => setBadgeInvisible(false)}
          onMouseLeave={() => setBadgeInvisible(true)}
          onClick={() => {
            openChatroomOnClick(chatroom.id);
          }}
        >
          <Avatar>
            <img
              alt="profilePic"
              className={classes.profilePic}
              src={
                image
                  ? `data:image/jpg;base64,${getImageBase64String(
                    image,
                  )}`
                  : `https://picsum.photos/seed/${chatroom.participants[0]}/150/150`
              }
            />
          </Avatar>
        </IconButton>
        <Badge
          badgeContent="X"
          onMouseEnter={() => setBadgeInvisible(false)}
          onMouseLeave={() => setBadgeInvisible(true)}
          color="secondary"
          className={classes.badge}
          onClick={() => {
            closeChatRoom(chatroom);
          }}
          invisible={badgeInvisible}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <IconButton />
        </Badge>
      </div>
      {open && (
        <React.Fragment>
          <CssBaseline />
          <Paper square className={classes.paper} ref={wrapperRef}>
            <Typography
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
              <div ref={messagesEndRef} />
            </List>
            <div className="chatroomActions">
              <div className={classes.submit}>
                <Input
                  className={classes.input}
                  type="text"
                  name="message"
                  placeholder="Type here..."
                  inputRef={messageRef}
                  onKeyPress={(e) => sendByEnter(e)}
                />
                <IconButton
                  className={classes.sendButton}
                  onClick={() => {
                    sendMessage();
                  }}
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
