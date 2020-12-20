/*eslint-disable */
import React, { useEffect, useState, useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
} from '@material-ui/core';
import network from '../../utils/network';
import { UserDataInterface } from '../../interfaces/userData';
import RoomateCard from '../../components/RoomateCardAnimate';
// import RoomateCard from '../../components/cardnomui';
import { UserContext } from '../../context/UserContext';
import {motion,AnimatePresence,} from 'framer-motion'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    overflowX:'hidden',
    // overflowY:'hidden',
    height:"90vh",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    // backgroundColor: theme.palette.background.default,
    backgroundColor: "#8f7967",
    fontFamily: "fantasy",
    // fontFamily
  },
  headerText: {
    fontFamily: "fantasy",
  },
  img: {
    height: 255,
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    width: "100%",
  },
  item: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    display: "block",
    top: "50%",
    // maxWidth: 400,
    overflow: "hidden",
    width: "100%",
  },
  footer: {
    backgroundColor: "#8f7967",
    // color: "white",
    bottom: 0,
    fontFamily: "fantasy",
  },
  like: {
    fill: "green",
    // backgroundColor: "green",
    // color: "black",
    bottom: 0,
    "&:hover": {
      backgroundColor: "#BFB4AB",
    },
  },
  unlike: {
    fill: "red",
    // backgroundColor: "red",
    // color: "black",
    bottom: 0,
    "&:hover": {
      backgroundColor: "#BFB4AB",
    },
  },
}));

function Roomates() {
  const [prefernces, setPrefernces] = useState<boolean>(false); // TODO: get actuall prefernces for the user and create prefernces interface
  const [allUsersInfo, setAllUsersInfo] = useState<UserDataInterface[]>([]);
  const context = useContext(UserContext);
  const classes = useStyles();
  const theme = useTheme();
  const like = async (likeId:string) => {
    
    // await network.post('/api/v1/users/match', {
      //   like:true,
      //   userId: context.id,
      //   passiveUserId: likeId
      // });
      nextCard()
    };
  const unlike = async (likeId:string) => {
    // await network.post('/api/v1/users/match', {
      //   like:false,
      //   userId: context.id,
      //   passiveUserId: likeId
      // });
      nextCard()
  };
  const nextCard = ():void =>{
    const removedFirstCard = allUsersInfo.slice(1)
    setAllUsersInfo(removedFirstCard)
  }
  const fetchData = async () => {
    const { data } = await network.get('/api/v1/users/basic-info');
    setAllUsersInfo(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const firstCard = allUsersInfo[0]
  console.log(firstCard)
  return (
    <div className="cards-page">
      {allUsersInfo[0] 
        ? (
          <div className={classes.root}>
            <Paper square elevation={0} className={classes.header}>
              <Typography className={classes.headerText}>
                Choose Your Next Roomate!
              </Typography>
            </Paper>
            <AnimatePresence exitBeforeEnter initial={false}>
              <RoomateCard 
                key={firstCard.id}
                userInfo={firstCard} 
                like={nextCard} 
                unlike={nextCard}
              />             
            </AnimatePresence>
              </div>
            ) 
        : (
          <div>loading...</div>
        )}
    </div>);
}
export default Roomates;
