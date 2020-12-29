import React, { useEffect, useState, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

export type Props = {
  [key: string]: any;
};

const useStyles = makeStyles({
  mainDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    boxShadow: '0 2px 5px 3px rgba(0,0,0,0.7)',
    textAlign: 'center',
    height: '15vh',
    overflowY: 'auto',
    width: '40vw',
    marginTop: '5%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#f1f1f1',
    color: 'black',
  },
  buttonsDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    width: '25%',
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
              <button onClick={logout} className={classes.button}>
                <DoneOutlineOutlinedIcon style={{ fill: 'green' }} />
              </button>
              <button onClick={handleLogoutClose} className={classes.button}>
                <CloseOutlinedIcon style={{ fill: 'red' }} />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LogoutModal;
