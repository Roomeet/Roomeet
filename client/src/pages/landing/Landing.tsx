/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BGLanding from '../../images/BGLanding.jpg'
import { CssBaseline } from '@material-ui/core';
import Header from '../../components/Header';
import ConnectionSection from '../../components/ConnectionSection';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${BGLanding})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
}));

function Landing() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <ConnectionSection />
    </div>
  );
}

export default Landing;
