/*eslint-disable */

import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import makeToast from '../utils/Toaster';
import ChatRoom from '../components/ChatRoom';
import network from '../utils/network';
import {
  AppBar,
  Avatar,
  createStyles,
  CssBaseline,
  Fab,
  IconButton,
  List,
  makeStyles,
  Paper,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/More';
import { AddIcCallOutlined } from '@material-ui/icons';
import InlineChatRoom from '../components/InlineChatRoom';

type messengerProps = {
  messengerOpen: boolean;
  openChatRoom: (roomId: string) => void
  socket: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  }),
);

const Messenger: React.FC<messengerProps> = ({ messengerOpen, openChatRoom ,socket }) => {
  const [chatrooms, setChatrooms] = useState<any[]>([]);
  const [allMatches, setAllMatches] = useState<any[]>([]);
  const user = useContext(UserContext);
  const classes = useStyles();

  const getChatrooms = async () => {
    try {
      const { data } = await network.get(`http://localhost:3002/messenger/chatroom/${user.id}`);
      if (!data[0]) {
        setChatrooms(data);
      }
    } catch (error) {
      console.log('Not Happend');
      setTimeout(getChatrooms, 3000);
    }
  };

  useEffect(() => {
    getChatrooms();
  }, []);

  return (
    <>
      {
        messengerOpen
          && (
            <div className={classes.messenger}>
              <React.Fragment>
                <CssBaseline />
                <Paper square className={classes.paper}>
                  <Typography className={classes.header} variant="h5" gutterBottom>
                    Inbox
                  </Typography>
                  <List className={classes.list}>
                    {chatrooms[0] ? chatrooms.map((match) => (
                      <InlineChatRoom 
                        socket={socket}
                        chatRoomId={match.userId}
                        openChatRoom={openChatRoom}
                      />
                      )) : <div>No chat rooms for you buddy</div>}
                  </List>
                <AppBar color="primary" className={classes.appBar}>
                  <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="open drawer">
                      <MenuIcon />
                    </IconButton>
                    <Fab color="secondary" aria-label="add" className={classes.fabButton}>
                      <AddIcCallOutlined />
                    </Fab>
                    <div className={classes.grow} />
                    <IconButton color="inherit">
                      <SearchIcon />
                    </IconButton>
                    <IconButton edge="end" color="inherit">
                      <MoreIcon />
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
