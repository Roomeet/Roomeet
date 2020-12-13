/*eslint-disable */
import React, { useEffect, useState, useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import {
  Container,
  IconButton,
  Paper,
  Typography,
  Button,
} from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import network from '../../utils/network';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { UserDataInterface } from '../../interfaces/userData';
import RoomateCard from '../../components/RoomateCard';
import { Link, useHistory } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { UserContext } from '../../context/UserContext';
import './roomates.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  item: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    display: 'block',
    top: '50%',
    // maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  footer: {
    bottom: 0,
  },
}));

function Roomates() {
  const [loading, setLoading] = useState<boolean>(false);
  const [prefernces, setPrefernces] = useState<boolean>(false); // todo: get actuall prefernces for the user and create prefernces interface
  const [allUsersInfo, setAllUsersInfo] = useState<UserDataInterface[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const context = useContext(UserContext);
  const classes = useStyles();
  const theme = useTheme();

  const handleNext = async (like: boolean) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
    await network.post('/api/v1/users/match', {
      like,
      userId: context.id,
      passiveUserId: allUsersInfo[activeStep].userId,
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const fetchData = async () => {
    const { data } = await network.get('/api/v1/users/basic-info');
    setAllUsersInfo(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='cards-page'>
      {!loading && allUsersInfo[0] ? (
        prefernces ? (
          <div>Roomate prefernces</div>
        ) : (
          <div className={classes.root}>
            <Paper square elevation={0} className={classes.header}>
              <Typography>Choose Your Next Roomate!</Typography>
            </Paper>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {/* <div className={classes.AllCardsDiv}>
            {allUsersInfo.map((userInfo: UserDataInterface, index: number) => (
              <RoomateCard userInfo={userInfo} key={index}/>
            ))}
          </div> */}
              {allUsersInfo.map(
                (userInfo: UserDataInterface, index: number) => (
                  <div className={classes.item} key={userInfo._id}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <RoomateCard userInfo={userInfo} key={index} />
                    ) : null}
                  </div>
                )
              )}
            </SwipeableViews>
            <MobileStepper
              steps={allUsersInfo.length}
              className={classes.footer}
              // position='static'
              variant='text'
              activeStep={activeStep}
              nextButton={
                <Button
                  size='small'
                  onClick={() => handleNext(true)}
                  // disabled={activeStep === allUsersInfo.length - 1}
                  disabled={activeStep === allUsersInfo.length}
                >
                  Like
                  {theme.direction === 'rtl' ? (
                    <ThumbDownIcon />
                  ) : (
                    <ThumbUpIcon />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size='small'
                  // onClick={handleBack}
                  onClick={() => handleNext(false)}
                  // disabled={activeStep === 0}
                  disabled={activeStep === allUsersInfo.length}
                >
                  {theme.direction === 'rtl' ? (
                    <ThumbUpIcon />
                  ) : (
                    <ThumbDownIcon />
                  )}
                  Unlike
                </Button>
              }
            />
          </div>
        )
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}

export default Roomates;
