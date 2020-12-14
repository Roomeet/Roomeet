import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ConnectionCard from '../components/ConnectionCard';
import LoginImage from '../images/BGLogin.jpg';
import SignupImage from '../images/BGSignup.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));

const LoginDescription = 'Already A user? Log In to see how many doors have been opened for you while your gone';
const SignupDescription = 'Not A member yet? Hop In! explore with us A new better world of finding your next partner online...';

const LandingConnectionSection: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ConnectionCard image={LoginImage} to="signin" title="Login" description={LoginDescription} />
      <ConnectionCard image={SignupImage} to="signup" title="Sign Up" description={SignupDescription} />
    </div>
  );
};

export default LandingConnectionSection;
