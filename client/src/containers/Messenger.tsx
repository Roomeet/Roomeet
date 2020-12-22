/*eslint-disable */

import React, { useContext, useEffect, useState, } from 'react';
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

type messengerProps = {
  messengerOpen: boolean;
  openChatRoom: (roomId: chatRoomI) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      padding: theme.spacing(2, 2, 0),
      position: 'relative',
      top: 0,
    },
    paper: {
      position: 'absolute',
      maxWidth: '400px',
      top: '50px',
      right: '100px',
      zIndex: 10,
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
  }),
);

const Messenger: React.FC<messengerProps> = ({ messengerOpen, openChatRoom }) => {
  const [chatrooms, setChatrooms] = useState<chatRoomI[]>([]);
  const context = useContext(UserContext);
  const classes = useStyles();
  const socket = useContext(SocketContext)

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
        socket.on('match', () => {
          getChatrooms();
        });
      }
  }, []);

  return (
    <>
      {
        messengerOpen
          && (
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
                      />
                      )) : <div>No chat rooms for you buddy</div>}
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
          )
      }
    </>
  );
};

export default Messenger;
