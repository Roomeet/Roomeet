/*eslint-disable */

import React from 'react';
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
import SearchIcon from '@material-ui/icons/Search';
import { NotificationI } from '../interfaces/notification';
import InlineNotification from '../components/InlineNotification';

type notificationsProps = {
  notificationsOpen: boolean;
  allNotifications: NotificationI[] | null;
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

const Messenger: React.FC<notificationsProps> = ({ notificationsOpen, allNotifications }) => {
  const classes = useStyles();

  return (
    <>
      {
        notificationsOpen
          && (
              <React.Fragment>
                <CssBaseline />
                <Paper square className={classes.paper}>
                  <Typography className={classes.header} variant="h5" gutterBottom>
                    Notifications
                  </Typography>
                  <List className={classes.list}>
                    {allNotifications?.length ? allNotifications?.map((notification: NotificationI) => (
                      <InlineNotification
                        notification={notification}
                      />
                      )) : <div>No notifications for you buddy</div>}
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
