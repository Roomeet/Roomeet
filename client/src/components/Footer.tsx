import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const Footer: React.FC = () => (
  <div className="footer">
    <Grid container justify="center" spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <Typography align="center" gutterBottom color="textSecondary">
          <Link to="/about/">About</Link>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography align="center" gutterBottom color="textSecondary">
          <Link to="/term-and-conditions/">Terms & Conditions</Link>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography align="center" gutterBottom color="textSecondary">
          <Link to="/contact-us/">Contact us</Link>
        </Typography>
      </Grid>
      {/* <Grid item xs={12} sm={6} md={3}>
        <Divider style={{ margin: '24px auto', width: 60 }} />
        <Typography variant="caption" align="center">
          © Copyright Roomeet 2020
        </Typography>
      </Grid> */}
    </Grid>
  </div>
);

export default Footer;
