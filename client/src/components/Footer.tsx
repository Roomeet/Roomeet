import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const Footer: React.FC = () => (
  <div className="footer">
    <Typography align="center" gutterBottom color="textSecondary">
      <Link to="/about/">About</Link>
    </Typography>
    <Typography align="center" gutterBottom color="textSecondary">
      <Link to="/term-and-conditions/">Terms & Conditions</Link>
    </Typography>
    <Typography align="center" gutterBottom color="textSecondary">
      <Link to="/contact-us/">Contact us</Link>
    </Typography>
  </div>
);

export default Footer;
