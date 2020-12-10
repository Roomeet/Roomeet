/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BGLanding from '../../images/BGLanding.jpg'
import BGLogin from '../../images/BGLogin.jpg'
import BGSignup from '../../images/BGSignup.jpg'
import { CssBaseline } from '@material-ui/core';
import Header from '../../components/Header';
import ConnectionSection from '../../components/ConnectionSection';
import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';

const useStyles = makeStyles((theme) => ({
  landing: {
    minHeight: '100vh',
    backgroundImage: `url(${BGLanding})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  signin: {
    minHeight: '100vh',
    backgroundImage: `url(${BGLogin})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  signup: {
    minHeight: '100vh',
    backgroundImage: `url(${BGSignup})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
}));

function Landing() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.landing}>
        <CssBaseline />
        <Header />
        <ConnectionSection />
      </div>
      {/* <div className={classes.signin}>
        <SignInForm />
      </div>
      <div className={classes.signup}>
        <SignUpForm />
      </div> */}
    </div>
  );
}

export default Landing;
