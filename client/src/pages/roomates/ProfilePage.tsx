import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import PetsOutlinedIcon from '@material-ui/icons/PetsOutlined';
import { ImWoman, ImMan } from 'react-icons/im';
import { UserDataInterface } from '../../interfaces/userData';
import network from '../../utils/network';
import { getImageBase64String } from '../../utils/image';

export type Props = {
  [key: string]: any;
};

const useStyles = makeStyles({
  mainDiv: {
  },
  modalDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 5px 3px rgba(0,0,0,0.7)',
    textAlign: 'center',
    height: '80%',
    overflowY: 'auto',
    minWidth: '300px',
    maxWidth: '500px',
    width: '70%',
    marginTop: '80px',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'black',
    backgroundColor: '#e0fbfc',
  },
  rows: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    borderTop: '0.5px solid #b3b5c0',
    paddingTop: '5px',
  },
  labels: {

  },
  infoData: {

  },
  profilePic: {
    pointerEvents: 'none',
    boxShadow: '0 2px 5px 3px rgba(0,0,0,0.7)',
    height: '30%',
    maxWidth: '200px',
    maxHeight: '200px',
    marginTop: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  nameTitle: {
    fontSize: '1.3em',
  },
  advancedInfoDiv: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    justifyContent: 'space-between',
  },
  basicInfoDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  titleInfoDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  aboutMe: {
    maxWidth: '90%',
  },
  basicInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const ProfilePage: React.FC<Props> = ({ open, handleClose, userId }) => {
  const [userInformation, setUserInformation] = useState<UserDataInterface>();
  const classes = useStyles();

  const fetchData = async () => {
    const { data } = await network.get(`/server/api/v1/users/user-data/${userId}`);
    setUserInformation(data[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {open && (
        <Modal open onClose={handleClose}>
          <div className={classes.modalDiv}>
            <div className={classes.basicInfoDiv}>
              <img
                alt="profilePic"
                className={classes.profilePic}
                src={
                  userInformation?.image
                  && `data:image/jpg;base64,${getImageBase64String(
                    userInformation.image,
                  )}`
                }
              />
              <h1>{userInformation?.fullName}</h1>
              <div className={classes.titleInfoDiv}>
                <Typography className={classes.nameTitle}>
                  {' '}
                  {userInformation?.gender === 'female' ? (
                    <ImWoman style={{ fill: 'red', fontSize: '3vh' }} />
                  ) : (
                    <ImMan style={{ fill: 'green', fontSize: '3vh' }} />
                  )}
                </Typography>
                <Typography className={classes.nameTitle}>
                  {userInformation?.age}
                </Typography>
              </div>
              <p className={classes.basicInfo}>
                <Typography variant="h6" className={classes.labels}>
                  Looking to rent in:
                </Typography>
                <Typography className={classes.infoData}>
                  {userInformation?.rentLocation ? userInformation?.rentLocation.addressName : ''}
                </Typography>
              </p>
              <p className={classes.basicInfo}>
                <Typography variant="h6" className={classes.labels}>
                  About me:
                </Typography>
                <Typography className={classes.aboutMe}>
                  {userInformation?.aboutMe}
                </Typography>
              </p>
              <p className={classes.basicInfo}>
                <Typography variant="h6" className={classes.labels}>
                  Range of Budget:
                </Typography>
                <Typography className={classes.aboutMe}>
                  {(userInformation?.minBudget) ? `${userInformation?.minBudget} - ${userInformation?.maxBudget}` : 'No Amount'}
                </Typography>
              </p>
            </div>
            <div className={classes.advancedInfoDiv}>
              <p className={classes.rows}>
                <Typography variant="h6" className={classes.labels}>
                  Smoking
                </Typography>
                <Typography className={classes.infoData}>
                  {userInformation?.smoke}
                </Typography>
              </p>
              <p className={classes.rows}>
                <Typography variant="h6" className={classes.labels}>
                  <PetsOutlinedIcon />
                  {' '}
                  Pet:
                </Typography>
                <Typography className={classes.infoData}>
                  {userInformation?.pet ? (
                    <DoneOutlineOutlinedIcon style={{ fill: 'green' }} />
                  ) : (
                    <CloseOutlinedIcon style={{ fill: 'red' }} />
                  )}
                </Typography>
              </p>
              <p className={classes.rows}>
                <Typography variant="h6" className={classes.labels}>
                  Relationship:
                </Typography>
                <Typography className={classes.infoData}>
                  {userInformation?.relationship ? (
                    <DoneOutlineOutlinedIcon style={{ fill: 'green' }} />
                  ) : (
                    <CloseOutlinedIcon style={{ fill: 'red' }} />
                  )}
                </Typography>
              </p>
              <p className={classes.rows}>
                <Typography variant="h6" className={classes.labels}>
                  Employed:
                </Typography>
                <Typography className={classes.infoData}>
                  {userInformation?.employed ? (
                    <DoneOutlineOutlinedIcon style={{ fill: 'green' }} />
                  ) : (
                    <CloseOutlinedIcon style={{ fill: 'red' }} />
                  )}
                </Typography>
              </p>
              <p className={classes.rows}>
                <Typography variant="h6" className={classes.labels}>
                  Number Of Roomates:
                </Typography>
                <Typography className={classes.infoData}>
                  {userInformation?.numOfRoomates ? (
                    userInformation.numOfRoomates
                  ) : (
                    <CloseOutlinedIcon style={{ fill: 'red' }} />
                  )}
                </Typography>
              </p>
              <p className={classes.rows}>
                <Typography variant="h6" className={classes.labels}>
                  Religion:
                </Typography>
                <Typography className={classes.infoData}>
                  {userInformation?.religion ? (
                    <DoneOutlineOutlinedIcon style={{ fill: 'green' }} />
                  ) : (
                    <CloseOutlinedIcon style={{ fill: 'red' }} />
                  )}
                </Typography>
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProfilePage;
