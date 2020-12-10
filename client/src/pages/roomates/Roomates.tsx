/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import network from '../../utils/network';
import { Container, IconButton, Paper, Typography } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { UserDataInterface } from '../../interfaces/userData';
import RoomateCard from '../../components/RoomateCard'
import './roomates.css';

const Roomates: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [prefernces, setPrefernces] = useState<boolean>(false); // todo: get actuall prefernces for the user and create prefernces interface
  const [allUsersInfo, setAllUsersInfo] = useState<UserDataInterface[]>([]);

  const fetchData = async () => {
    const { data } = await network.get('/api/v1/users/basic-info');
    setAllUsersInfo(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const useStyles = makeStyles({
    AllCardsDiv: {
      display: 'flex',
      height: '100%',
      width: '100%',
      flexWrap: 'wrap',
      overflowX: 'scroll',
    },
  });

  const classes = useStyles();

  return (
    <div className='cards-page'>
      {!loading ? (
        prefernces ? (
          <div>Roomate prefernces</div>
        ) : (
          // <Paper className="no-preferences-card">
          //   <Typography component="div">
          //     You need to set prefernces
          //     <IconButton>
          //       <Link to="/userDataForm">
          //         <PersonAddIcon/>
          //       </Link>
          //     </IconButton>
          //   </Typography>
          //  </Paper>
          <div className={classes.AllCardsDiv}>
            {allUsersInfo.map((userInfo: UserDataInterface, index: number) => (
              <RoomateCard userInfo={userInfo} key={index}/>
            ))}
          </div>
        )
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default Roomates;
