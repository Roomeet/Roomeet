/* eslint-disable */
import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { UserContext } from '../../context/UserContext';
import { UserDataInterface } from '../../interfaces/userData';
import network from '../../utils/network';
import { getImageBase64String } from '../../utils/image';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '1%',
  },
  myProfileDiv: {
    backgroundColor: '#e0fbfc',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 5px 3px rgba(0,0,0,0.7)',
    color: '#2E2019',
    width: '80%',
    marginRight: 'auto',
    marginLeft: 'auto',
    height: '85vh',
    minWidth: '300px',
    maxWidth: '500px',
  },
  noProfileDiv: {
    backgroundColor: '#BFB4AB',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 5px 3px rgba(0,0,0,0.7)',
    color: '#2E2019',
    width: '50%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '15%',
  },
  textFiled: {
    display: 'inline-block',
    margin: '5px',
  },
  textArea: {
    display: 'inline-block',
    margin: '5px',
    width: '15vw',
  },
  profilePic: {
    pointerEvents: 'none',
    boxShadow: '0 2px 5px 3px rgba(0,0,0,0.7)',
    height: '150px',
    width: '150px',
  },
  titleAndPic: {
    display: 'flex',
    marginBottom: '2vh',
    flexDirection: 'column',
  },
  editButton: {
    display: 'flex',
    marginLeft: 'auto',
    background: '#98c1d9',
    position: 'sticky',
    width: '100%',
    height: '70px',
  },
  header: {
    width: '100%',
    position: 'absolute',
  },
  data:{
    paddingTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    'overflow-y': 'auto',

  }
});

const MyProfile: React.FC = () => {
  const [userInformation, setUserInformation] = useState<UserDataInterface>();
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();
  const context = useContext(UserContext);
  const classes = useStyles();

  const fetchData = async () => {
    const { data } = await network.get(`/api/v1/users/user-data/${context.id}`);
    setUserInformation(data[0]);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={classes.root}>
        {!loading ? (
          <>
            {userInformation ? (
              <div className={classes.myProfileDiv}>
                <div className={classes.editButton}>
                  <h2 className={classes.header}>My Profile</h2>
                  <Button onClick={() => history.push('/edit')}>
                    <EditIcon />
                  </Button>
                </div>
                <div className={classes.data}>
                  <div className={classes.titleAndPic}>
                    <img
                      alt='profilePic'
                      className={classes.profilePic}
                      src={
                        userInformation.image
                          ? `data:image/jpg;base64,${getImageBase64String(
                              userInformation.image
                            )}`
                          : `https://picsum.photos/seed/${userInformation.userId}/150/150`
                      }
                    />
                  </div>
                  <TextField
                    id='standard-disabled'
                    disabled
                    label='Full Name:'
                    className={classes.textFiled}
                    InputProps={{ readOnly: true }}
                    value={userInformation.fullName}
                  />
                  <div className={classes.textArea}>
                    <TextField
                      disabled
                      id='standard-disabled'
                      label='About Me:'
                      multiline
                      fullWidth
                      InputProps={{ readOnly: true }}
                      value={userInformation.aboutMe}
                    />
                  </div>
                  <TextField
                    disabled
                    id='standard-disabled'
                    label='Rent Location:'
                    className={classes.textFiled}
                    InputProps={{ readOnly: true }}
                    value={userInformation.rentLocation}
                  />
                  <TextField
                    disabled
                    id='standard-disabled'
                    label='Age:'
                    className={classes.textFiled}
                    InputProps={{ readOnly: true }}
                    value={userInformation.age}
                  />
                  <TextField
                    disabled
                    id='standard-disabled'
                    label='Gender:'
                    className={classes.textFiled}
                    InputProps={{ readOnly: true }}
                    value={userInformation.gender}
                  />
                  <TextField
                    disabled
                    id='standard-disabled'
                    label='Smoke:'
                    className={classes.textFiled}
                    InputProps={{ readOnly: true }}
                    value={userInformation.smoke}
                  />
                  <TextField
                    disabled
                    id='standard-disabled'
                    label='Pet:'
                    className={classes.textFiled}
                    InputProps={{ readOnly: true }}
                    value={userInformation.pet ? 'Yes' : 'No'}
                  />
                  <TextField
                    disabled
                    id='standard-disabled'
                    label='Status:'
                    className={classes.textFiled}
                    InputProps={{ readOnly: true }}
                    value={
                      userInformation.relationship
                        ? 'In Relationship'
                        : 'Single'
                    }
                  />
                  <TextField
                    disabled
                    id='standard-disabled'
                    label='Employed:'
                    className={classes.textFiled}
                    InputProps={{ readOnly: true }}
                    value={userInformation.employed ? 'Yes' : 'No'}
                  />
                  <TextField
                    disabled
                    id='standard-disabled'
                    label='Number of Roomates:'
                    className={classes.textFiled}
                    InputProps={{ readOnly: true }}
                    value={userInformation.numOfRoomates}
                  />
                  <TextField
                    disabled
                    id='standard-disabled'
                    label='Religion:'
                    className={classes.textFiled}
                    InputProps={{ readOnly: true }}
                    value={userInformation.religion ? 'Yes' : 'No'}
                  />
                </div>
              </div>
            ) : (
              <div className={classes.noProfileDiv}>
                You don't have any profile....
                <br />
                You can click here and create one
                <Button>
                  <Button onClick={() => history.push('/edit')}>
                    <PersonAddIcon />
                  </Button>
                </Button>
              </div>
            )}
          </>
        ) : (
          <div>were loading...</div>
        )}
      </div>
    </>
  );
};

export default MyProfile;
