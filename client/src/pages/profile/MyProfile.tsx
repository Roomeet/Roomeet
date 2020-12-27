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
  },
  myProfileDiv: {
    backgroundColor: '#BFB4AB',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    border: '5px solid #2E2019',
    color: '#2E2019',
    width: '50%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: '5vh',
  },
  noProfileDiv: {
    backgroundColor: '#BFB4AB',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    border: '5px solid #2E2019',
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
    borderRadius: '50%',
    border: '7px solid black',
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
  },
});

const MyProfile: React.FC = () => {
  const [userInformation, setUserInformation] = useState<UserDataInterface>();
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();
  const context = useContext(UserContext);
  const classes = useStyles();

  const fetchData = async () => {
    const { data } = await network.get(`/api/v1/users/user-data/${context.id}`);
    console.log(data[0]);
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
            { userInformation ? (
              <div className={classes.myProfileDiv}>
                <div className={classes.editButton}>
                  <Button onClick={() => history.push('/edit')}>
                    <EditIcon />
                  </Button>
                </div>
                <div className={classes.titleAndPic}>
                  <h1>My Profile</h1>
                  <img
                    // width='250'
                    // height='250'
                    alt="profilePic"
                    className={classes.profilePic}
                    src={userInformation.image ? `data:image/jpg;base64,${getImageBase64String(userInformation.image)}` :
                    `https://picsum.photos/seed/${userInformation.userId}/150/150`}
                  />
                </div>
                <TextField
                  id="standard-disabled"
                  disabled
                  label="Full Name:"
                  className={classes.textFiled}
                  InputProps={{ readOnly: true }}
                  value={userInformation.fullName}
                />
                <div className={classes.textArea}>
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="About Me:"
                    multiline
                    fullWidth
                    InputProps={{ readOnly: true }}
                    value={userInformation.aboutMe}
                  />
                </div>
                <TextField
                  disabled
                  id="standard-disabled"
                  label="Rent Location:"
                  className={classes.textFiled}
                  InputProps={{ readOnly: true }}
                  value={userInformation.rentLocation}
                />
                <TextField
                  disabled
                  id="standard-disabled"
                  label="Age:"
                  className={classes.textFiled}
                  InputProps={{ readOnly: true }}
                  value={userInformation.age}
                />
                <TextField
                  disabled
                  id="standard-disabled"
                  label="Gender:"
                  className={classes.textFiled}
                  InputProps={{ readOnly: true }}
                  value={userInformation.gender}
                />
                <TextField
                  disabled
                  id="standard-disabled"
                  label="Smoke:"
                  className={classes.textFiled}
                  InputProps={{ readOnly: true }}
                  value={userInformation.smoke}
                />
                <TextField
                  disabled
                  id="standard-disabled"
                  label="Pet:"
                  className={classes.textFiled}
                  InputProps={{ readOnly: true }}
                  value={userInformation.pet ? 'Yes' : 'No'}
                />
                <TextField
                  disabled
                  id="standard-disabled"
                  label="Status:"
                  className={classes.textFiled}
                  InputProps={{ readOnly: true }}
                  value={
                    userInformation.relationship ? 'In Relationship' : 'Single'
                  }
                />
                <TextField
                  disabled
                  id="standard-disabled"
                  label="Employed:"
                  className={classes.textFiled}
                  InputProps={{ readOnly: true }}
                  value={userInformation.employed ? 'Yes' : 'No'}
                />
                <TextField
                  disabled
                  id="standard-disabled"
                  label="Number of Roomates:"
                  className={classes.textFiled}
                  InputProps={{ readOnly: true }}
                  value={userInformation.numOfRoomates}
                />
                <TextField
                  disabled
                  id="standard-disabled"
                  label="Religion:"
                  className={classes.textFiled}
                  InputProps={{ readOnly: true }}
                  value={userInformation.religion ? 'Yes' : 'No'}
                />
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
        )
          : <div>were loading...</div>}
      </div>
    </>
  );
};

export default MyProfile;
