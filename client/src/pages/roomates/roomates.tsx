/*eslint-disable */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import network from '../../utils/network';
import { Container, IconButton, Paper, Typography } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import './roomates.css';

const Roomates: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [prefernces, setPrefernces] = useState<boolean>(false); // todo: get actuall prefernces for the user and create prefernces interface

  return (
    <div className='cards-page'>
      {!loading ? (
        prefernces ? (
          <div>All Roomates</div>
        ) : (
          <Paper className='no-preferences-card'>
            <IconButton>
              <Link to='/profile'>
                <Typography component='div' className='button'>
                  <p>You need to set your profile</p>
                  <PersonAddIcon />
                </Typography>
              </Link>
            </IconButton>
          </Paper>
        )
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default Roomates;
