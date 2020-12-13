import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: 445,
    background: 'rgba(0,0,0,0.5)',
    margin: '20px',
    '&:hover': { width: 455, height: 395 },
  },
  media: {
    height: 240,
  },
  title: {
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#fff',
  },
  description: {
    fontFamily: 'Nunito',
    fontSize: '1.1rem',
    color: '#ddd',
  },
});

type Props = {
  image: string;
  title: string;
  description: string;
  to: string;
}

const ConnectionCard: React.FC<Props> = ({
  image,
  title,
  description,
  to,
}) => {
  const classes = useStyles();

  return (
    <Link to={to}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={`${image}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ConnectionCard;
