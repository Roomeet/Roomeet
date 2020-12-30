/*eslint-disable */

import React, { useContext, useEffect, useState, SetStateAction, Dispatch } from 'react';
import { UserContext } from '../context/UserContext';
import network from '../utils/network';
import {
  AppBar,
  createStyles,
  CssBaseline,
  IconButton,
  List,
  makeStyles,
  Paper,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InlineChatRoom from '../components/InlineChatRoom';
import { chatRoomI } from '../interfaces/chat';
import SocketContext from '../context/socketContext';
import useDetectOutside from '../hooks/useDetectOutside';


type messengerProps = {
  messengerOpen: boolean;
  openChatRoom: (roomId: chatRoomI) => void
  setMessengerOpen: Dispatch<SetStateAction<boolean>>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messenger: {
      position: 'absolute',
      maxWidth: '500px',
      minWidth: '300px',
      top: '70px',
      right: '3vw',
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
  }),
);

const Messenger: React.FC<messengerProps> = ({ messengerOpen, openChatRoom, setMessengerOpen }) => {
  const [chatrooms, setChatrooms] = useState<chatRoomI[]>([]);
  const context = useContext(UserContext);
  const classes = useStyles();
  const socket = useContext(SocketContext)
  const wrapperRef = React.useRef(null);

  useDetectOutside(wrapperRef, setMessengerOpen);

  const getChatrooms = async () => {
    try {
      const { data } = await network.get(`http://localhost:3002/api/v1/messenger/chatrooms/user/${context.id}`);
      if (data[0]) {
        setChatrooms(data);
      }
    } catch (error) {
      setTimeout(getChatrooms, 3000);
    }
  };

  useEffect(() => {
    getChatrooms();
    if (socket) {
        // define the new message event
        socket.on(`matchNotification${context.id}`, () => {
          getChatrooms();
        });
      }
  }, []);  

  return (
    <>
      {
        messengerOpen
          && (
            <div className={classes.messenger} ref={wrapperRef}>
              <React.Fragment>
                <CssBaseline />
                <Paper square className={classes.paper}>
                  <Typography className={classes.header} variant="h5" gutterBottom>
                    Inbox
                  </Typography>
                  <List className={classes.list}>
                    {chatrooms ? chatrooms.map((chatroom) => (
                      <InlineChatRoom 
                        chatroom={chatroom}
                        openChatRoom={openChatRoom}
                        setMessengerOpen={setMessengerOpen}
                      />
                      )) : <div>Empty</div>}
                  </List>
                <AppBar color="primary" className={classes.appBar}>
                  <Toolbar>
                    <div className={classes.grow} />
                    <IconButton color="inherit">
                      <SearchIcon />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                </Paper>
              </React.Fragment>
            </div>
          )
      }
    </>
  );
};

export default Messenger;
