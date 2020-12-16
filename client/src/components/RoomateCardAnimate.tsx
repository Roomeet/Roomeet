import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardActions, CardContent, Button, Typography, Modal,
} from '@material-ui/core/';
// import blueDoor from '../images/blueDoor.png';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import brownDoor from '../images/brownDoor.png';
import ProfilePage from '../pages/roomates/ProfilePage';
// import { UserDataInterface } from '../../../server/models/UserData';

export type Props = {
  [key: string]: any;
};

const useStyles = makeStyles({
  root: {
    backgroundColor: '#BFB4AB',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    border: '5px solid #2E2019',
    color: '#2E2019',
    width: '100%',
    marginBottom: '15%',
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
  },
  cardDiv: {
    height: '100%',
    width: '80%',
    maxWidth: '500px',
    marginTop: '4.5vh',
    marginBottom: '3vh',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  profilePic: {
    borderRadius: '50%',
    border: '7px solid black',
  },
  like: {
    fill: 'green',
    // backgroundColor: "green",
    // color: "black",
    bottom: 0,
    '&:hover': {
      backgroundColor: '#BFB4AB',
    },
  },
  unlike: {
    fill: 'red',
    // backgroundColor: "red",
    // color: "black",
    bottom: 0,
    '&:hover': {
      backgroundColor: '#BFB4AB',
    },
  },
});

const RoomateCard = ({
  userInfo, like, unlike,
}:{
  userInfo:any,
  like:(id:string)=>void,
  unlike:(id:string)=>void,

}) : JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
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
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      exit={{
        scale: 0.5,
        opacity: 0,
        transition: {
          duration: 1,
        },
      }}
      onDragEnd={
        (event, info) => {
          if (info.offset.x > 100) {
            like(userInfo.id);
          } else if (info.offset.x < -100) {
            unlike(userInfo.id);
          }
        }
      }
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
              src={`https://picsum.photos/seed/${userInfo.id}/150/150`}
            />
          </Typography>
          <Typography variant="h5" component="h2">
            {userInfo.userId}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Summary:
          </Typography>
          <Typography variant="body2" component="p">
            {userInfo.age}
            ,
            {userInfo.gender}
            <br />
            looking for:
            {' '}
            {userInfo.lookingFor?.roomate ? 'roomate' : ''}
            {userInfo.lookingFor?.roomate && userInfo.lookingFor?.friend
              ? ', '
              : ' '}
            {userInfo.lookingFor?.friend ? 'friend' : ''}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={handleOpen}
            className={classes.goToProfile}
            size="small"
            // onClick={handleOpenProfile}
          >
            <img
              className={classes.goToProfile}
              alt="brownDoor"
              src={brownDoor}
            />
          </Button>
          <ProfilePage open={open} handleClose={handleClose} userId={userInfo.userId} />
        </CardActions>
        <CardActions>
          <Button
            size="small"
            className={classes.like}
            onClick={() => { like(userInfo.id); }}
          >
            <ThumbUpIcon className={classes.like} />
          </Button>
          <Button
            size="small"
            className={classes.unlike}
            onClick={() => { unlike(userInfo.id); }}
          >
            <ThumbDownIcon className={classes.unlike} style={{ fill: 'red' }} />
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default RoomateCard;
