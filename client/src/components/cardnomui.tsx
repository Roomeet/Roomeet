import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import blueDoor from '../images/blueDoor.png';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import brownDoor from '../images/brownDoor.png';
import ProfilePage from '../pages/roomates/ProfilePage';
// import { UserDataInterface } from '../../../server/models/UserData';
import './card.scss';

export type Props = {
  [key: string]: any;
};

const RoomateCard = ({
  userInfo, like, unlike,
}:{
  userInfo:any,
  like:(id:string)=>void,
  unlike:(id:string)=>void,

}) : JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <motion.div
      // className={classes.cardDiv}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      exit={{
        scale: 0.5,
        opacity: 0,
        transition: {
          duration: 0.5,
        },
      }}
      onClick={() => { like(userInfo.id); }}
      // onDragEnd={
      //   (event, info) => {
      //     if (info.offset.x > 100) {
      //       like(userInfo.id);
      //     } else if (info.offset.x < -100) {
      //       unlike(userInfo.id);
      //     }
      //   }
      // }
    >
      <div className="card">
        <img
          alt="profilePic"
          className="profile-pic"
          src={`https://picsum.photos/seed/${userInfo.id}/150/150`}
        />
        <h2
          className="userName"
        >
          {userInfo.fullName}
        </h2>
        <h3>
          Summary:
        </h3>
        <p>
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
        </p>
        {/* <img
          onClick={handleOpen}
          alt="brownDoor"
          src={brownDoor}
        />
        <ProfilePage open={open} handleClose={handleClose} userId={userInfo.userId} />
        <button
          className={classes.like}
          onClick={() => { like(userInfo.id); }}
        >
          <ThumbUpIcon />
        </button>
        <button
          onClick={() => { unlike(userInfo.id); }}
        >
          <ThumbDownIcon className={classes.unlike} style={{ fill: 'red' }} />
        </button> */}
      </div>
    </motion.div>
  );
};

export default RoomateCard;
