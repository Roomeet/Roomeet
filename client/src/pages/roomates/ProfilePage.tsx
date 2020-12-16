import React, { useEffect, useState, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import SmokingRoomsOutlinedIcon from '@material-ui/icons/SmokingRoomsOutlined';
import PetsOutlinedIcon from '@material-ui/icons/PetsOutlined';
import SmokeFreeOutlinedIcon from '@material-ui/icons/SmokeFreeOutlined';
import { ImWoman, ImMan } from 'react-icons/im';
import { UserContext } from '../../context/UserContext';
import { UserDataInterface } from '../../interfaces/userData';
import network from '../../utils/network';

export type Props = {
  [key: string]: any;
};

const useStyles = makeStyles({
  mainDiv: {
  },
  modalDiv: {
    display: 'flex',
    flexDirection: 'column',
    border: '3px solid black',
    textAlign: 'center',
    height: '70%',
    overflowY: 'auto',
    // '*::-webkit-scrollbar': {
    //   width: '1px',
    // },
    width: '50%',
    marginTop: '5%',
    marginLeft: 'auto',
    marginRight: 'auto',
    // background: '#BFB4AB',
    backgroundColor: 'white',
    color: 'black',
  },
  rows: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '100%',
  },
  labels: {
    fontWeight: 'bold',
    left: '35%',
  },
  infoData: {
    fontSize: '1.4em',
    left: '0%',
  },
  profilePic: {
    // position: 'relative',
    // left: '0%',
    // top: '0%',
    borderRadius: '50%',
    border: '3px solid black',
    // backgroundColor: 'green',
    height: '80%',
    width: '30%',
    marginTop: '2vh',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  nameTitle: {
    // backgroundColor: 'brown',
    height: '30vh',
  },
  imgDiv: {
    backgroundColor: '#BFB4AB',
  },
});

const ProfilePage: React.FC<Props> = ({ open, handleClose, userId }) => {
  const [userInformation, setUserInformation] = useState<UserDataInterface>();
  const context = useContext(UserContext);
  const classes = useStyles();

  const fetchData = async () => {
    const { data } = await network.get(`/api/v1/users/user-data/${userId}`);
    setUserInformation(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {open && (
        <Modal open onClose={handleClose}>
          <div className={classes.modalDiv}>
            <div className={classes.imgDiv}>
              <img
                alt="profilePic"
                className={classes.profilePic}
                src="https://picsum.photos/150/150"
              />
            </div>
            <h2 className={classes.nameTitle}>{userId}</h2>
            <p className={classes.rows}>
              <Typography variant="h6" className={classes.labels}>
                Age:
              </Typography>
              <Typography className={classes.infoData}>
                {userInformation?.age}
              </Typography>
            </p>
            <p className={classes.rows}>
              <Typography variant="h6" className={classes.labels}>
                Gender:
              </Typography>
              <Typography className={classes.infoData}>
                {' '}
                {userInformation?.gender === 'Female' ? (
                  <ImWoman style={{ fill: 'red', fontSize: '3vh' }} />
                ) : (
                  <ImMan style={{ fill: 'green', fontSize: '3vh' }} />
                )}
              </Typography>
            </p>
            <p className={classes.rows}>
              <Typography variant="h6" className={classes.labels}>
                Smoking
              </Typography>
              <Typography className={classes.infoData}>
                {userInformation?.gender ? (
                  <SmokingRoomsOutlinedIcon style={{ fill: 'green' }} />
                ) : (
                  <SmokeFreeOutlinedIcon style={{ fill: 'red' }} />
                )}
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
                Interests:
              </Typography>
              <Typography className={classes.infoData}>
                {userInformation?.interests ? (
                  userInformation.interests.map((interest: string) => (
                    <span>{interest}</span>
                  ))
                ) : (
                  <CloseOutlinedIcon style={{ fill: 'red' }} />
                )}
              </Typography>
            </p>
            <p className={classes.rows}>
              <Typography variant="h6" className={classes.labels}>
                Languages:
              </Typography>
              <Typography className={classes.infoData}>
                {userInformation?.languages ? (
                  userInformation.languages.map((language: string) => (
                    <span>
                      {language}
                      {' '}
                    </span>
                  ))
                ) : (
                  <CloseOutlinedIcon style={{ fill: 'red' }} />
                )}
              </Typography>
            </p>
            <p className={classes.rows}>
              <Typography variant="h6" className={classes.labels}>
                Music:
              </Typography>
              <Typography className={classes.infoData}>
                {userInformation?.music ? (
                  userInformation.music.map((musicStyle: string) => (
                    <span>
                      {musicStyle}
                      {' '}
                    </span>
                  ))
                ) : (
                  <CloseOutlinedIcon style={{ fill: 'red' }} />
                )}
              </Typography>
            </p>
            {/* <p className={classes.rows}>
              <Typography variant="h6" className={classes.labels}>
                Looking For:
              </Typography>
              <Typography className={classes.infoData}>
                {
                  userInformation?.lookingFor
                    ? (
                      userInformation?.lookingFor?.roomate
                        ? (
                          userInformation?.lookingFor.friend
                            ? (
                              'Roomate / friend'
                            )
                            : 'Roomate'
                        )
                        : (
                          userInformation.lookingFor?.friend
                            ? (
                              'friend'
                            )
                            : (
                              ''
                            )
                        )
                    )
                    : ''

                }
              </Typography>
            </p> */}
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
        </Modal>
      )}
    </div>
  );
};

export default ProfilePage;
