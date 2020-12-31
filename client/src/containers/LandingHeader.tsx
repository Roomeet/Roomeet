import React, { useEffect, useState } from 'react';
import * as Scroll from 'react-scroll';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Collapse,
  IconButton,
  Toolbar,
} from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Nunito',
  },
  appBar: {
    background: 'none',
  },
  appBarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appBarTitle: {
    flexGrow: 1,
  },
  icon: {
    color: '#fff',
    fontSize: '2rem',
    width: '2rem',
  },
  colorTextRoo: {
    color: '#5AFF3D',
  },
  colorTextEet: {
    color: '#d8fd08',
  },
  colorTextM: {
    color: '#ffffff',
  },
  title: {
    color: '#fff',
    fontSize: '3rem',
  },
  container: {
    textAlign: 'center',
  },
  goDown: {
    color: '#5AFF3D',
    fontSize: '4rem',
  },
});

const LandingHeader: React.FC = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} elevation={0}>
        <Toolbar className={classes.appBarWrapper}>
          <h1 className={classes.appBarTitle}>
            <span className={classes.colorTextRoo}>
              Roo
            </span>
            <span className={classes.colorTextM}>
              M
            </span>
            <span className={classes.colorTextEet}>
              eet
            </span>
            .
          </h1>
          <IconButton className={classes.icon}>
            <SortIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Collapse in={checked} {... (checked ? { timeout: 1000 } : {})} collapsedHeight={50}>
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome To
            <br />
            <span className={classes.colorTextRoo}>
              Roo
            </span>
            <span className={classes.colorTextM}>
              M
            </span>
            <span className={classes.colorTextEet}>
              eet
            </span>
          </h1>
          <IconButton>
            <ExpandMoreIcon
              className={classes.goDown}
              onClick={() => { Scroll.animateScroll.scrollToBottom(); }}
            />
          </IconButton>
        </div>
      </Collapse>
    </div>
  );
};

export default LandingHeader;
