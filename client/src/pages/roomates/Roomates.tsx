/*eslint-disable */
import React, { useEffect, useState } from 'react';
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
import { autoPlay } from 'react-swipeable-views-utils';
import network from '../../utils/network';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { UserDataInterface } from '../../interfaces/userData';
import RoomateCard from '../../components/RoomateCard';
import { Link, useHistory } from 'react-router-dom';
import './roomates.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
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
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
}));

function Roomates() {
  const [loading, setLoading] = useState<boolean>(false);
  const [prefernces, setPrefernces] = useState<boolean>(false); // todo: get actuall prefernces for the user and create prefernces interface
  const [allUsersInfo, setAllUsersInfo] = useState<UserDataInterface[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  const theme = useTheme();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
              <Typography>{allUsersInfo[activeStep]._id}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
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
            </AutoPlaySwipeableViews>
            <MobileStepper
              steps={allUsersInfo.length}
              position='static'
              variant='text'
              activeStep={activeStep}
              nextButton={
                <Button
                  size='small'
                  onClick={handleNext}
                  disabled={activeStep === allUsersInfo.length - 1}
                >
                  Next
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size='small'
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
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
