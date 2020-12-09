import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import blueDoor from '../images/blueDoor.png';
import brownDoor from '../images/brownDoor.png';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: '#BFB4AB',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    border: '5px solid #2E2019',
    color: '#2E2019',
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
    height: '30vh',
    backgroundColor: 'black',
  },
  profilePic: {
    borderRadius: '50%',
    border: '7px solid black',
  },
});

const RoomateCard: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.cardDiv}>
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
              src="https://picsum.photos/150/150"
            />
          </Typography>
          <Typography variant="h5" component="h2">
            Roomate Name
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Summary:
          </Typography>
          <Typography variant="body2" component="p">
            Some stupid facts
            <br />
            anothor stupid facts
          </Typography>
        </CardContent>
        <CardActions>
          <Button className={classes.goToProfile} size="small">
            <img
              className={classes.goToProfile}
              alt="blueDoor"
              src={brownDoor}
            />
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default RoomateCard;
