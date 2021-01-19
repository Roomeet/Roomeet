/*eslint-disable */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BGLanding from '../../images/Page-Turner.svg'
import { CssBaseline } from '@material-ui/core';
import LandingHeader from '../../containers/LandingHeader';
import LandingConnectionSection from '../../containers/LandingConnectionSection';

const useStyles = makeStyles((theme) => ({
  landing: {
    minHeight: '100vh',
    backgroundImage: `url(${BGLanding})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
}));

function Landing() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.landing}>
        <CssBaseline />
        <LandingHeader />
        <LandingConnectionSection />
      </div>
    </div>
  );
}

export default Landing;
