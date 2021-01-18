import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardActions, CardContent, Button, Typography, Modal,
} from '@material-ui/core/';
// import blueDoor from '../images/blueDoor.png';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { motion } from 'framer-motion';
import brownDoor from '../images/brownDoor.png';
import ProfilePage from '../pages/roomates/ProfilePage';
import { UserDataInterface } from '../interfaces/userData';
import { getImageBase64String } from '../utils/image';

export interface CardProps {
  userInfo:UserDataInterface,
  handleSwipe:(liked:boolean)=>void
}
const screenWidth = window.screen.availWidth;

const useStyles = makeStyles({
  root: {
    backgroundColor: '#e0fbfc',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    boxShadow: '0 2px 5px 3px rgba(0,0,0,0.7)',
    color: '#2E2019',
    width: '100%',
    maxHeight: '600px',
    height: '70vh',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  goToProfile: {
    height: '15vh',
    marginRight: 'auto',
    marginLeft: 'auto',
    '&:hover':
{ transform: 'scale(1.02)' },
  },
  cardDiv: {
    cursor: 'grab',
    maxWidth: '500px',
    minWidth: '300px',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  profilePic: {
    pointerEvents: 'none',
    boxShadow: '0 2px 5px 3px rgba(0,0,0,0.7)',
    height: '150px',
    width: '150px',
  },
  like: {
    fill: 'green',
    bottom: 0,
    '&:hover': {
      backgroundColor: '#bbc8df',
      transform: 'scale(1.05)',
    },
  },
  unlike: {
    fill: 'red',
    bottom: 0,
    '&:hover': {
      backgroundColor: '#bbc8df',
      transform: 'scale(1.05)',
    },
  },
});

const RoomateCard = ({
  userInfo, handleSwipe,
}:CardProps) : JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const cardVariants = {
    initial: {
      opacity: 0,
      scale: 0.5,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      x: screenWidth,
      scale: 0.9,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <motion.div
      className={classes.cardDiv}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onDragEnd={
        (event, info) => {
          if (info.offset.x > screenWidth / 6) {
            cardVariants.exit.x = screenWidth;
            handleSwipe(false);
          }
          if (info.offset.x < -screenWidth / 6) {
            cardVariants.exit.x = -screenWidth;
            handleSwipe(true);
          }
        }
      }
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{
        margin: 'auto',
        width: '30vw',
      }}
      dragElastic={0.9}
    >
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            <br />
            <img
              alt="profilePic"
              className={classes.profilePic}
              src={userInfo.image ? `data:image/jpg;base64,${getImageBase64String(userInfo.image)}`
                : `https://picsum.photos/seed/${userInfo.userId}/150/150`}
            />
          </Typography>
          <Typography variant="h5" component="h2">
            {userInfo.fullName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            About me:
          </Typography>
          <Typography variant="body2" component="p">
            {userInfo.aboutMe}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Searching to rent in:
          </Typography>
          <Typography variant="body2" component="p">
            {userInfo.rentLocation ? userInfo.rentLocation.addressName : ''}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleOpen}
          >
            Read More
          </Button>
          <ProfilePage open={open} handleClose={handleClose} userId={userInfo.userId} />
        </CardActions>
        <CardActions>
          <Button
            size="small"
            className={classes.like}
            onClick={() => { handleSwipe(true); }}
          >
            <ThumbUpIcon className={classes.like} />
          </Button>
          <Button
            size="small"
            className={classes.unlike}
            onClick={() => { handleSwipe(false); }}
          >
            <ThumbDownIcon className={classes.unlike} style={{ fill: 'red' }} />
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default RoomateCard;
