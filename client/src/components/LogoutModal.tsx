import React, { useEffect, useState, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

export type Props = {
  [key: string]: any;
};

const useStyles = makeStyles({
  mainDiv: {
    display: 'flex',
    flexDirection: 'column',
    border: '3px solid black',
    textAlign: 'center',
    height: '6%',
    overflowY: 'auto',
    width: '20%',
    marginTop: '5%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
    color: 'black',
  },
  buttonsDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

const LogoutModal: React.FC<Props> = ({ openLogout, handleLogoutClose, logout }) => {
  const classes = useStyles();

  return (
    <div>
      {openLogout && (
        <Modal open onClose={handleLogoutClose}>
          <div className={classes.mainDiv}>
            <Typography variant="h6">
              Are you sure you want to logout?
            </Typography>
            <div className={classes.buttonsDiv}>
              <button onClick={logout}>
                Yes
              </button>
              <button onClick={handleLogoutClose}>
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LogoutModal;
