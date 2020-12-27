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
import {motion,AnimatePresence,} from 'framer-motion'
import { UserContext } from '../../context/UserContext';
import SocketContext from "../../context/socketContext";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";



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
    backgroundColor: "#8f7967",
    fontFamily: "fantasy",
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
    display: "block",
    top: "50%",
    overflow: "hidden",
    width: "100%",
  },
  footer: {
    backgroundColor: "#8f7967",
    bottom: 0,
    fontFamily: "fantasy",
  },
  like: {
    fill: "green",
    bottom: 0,
    "&:hover": {
      backgroundColor: "#BFB4AB",
    },
  },
  unlike: {
    fill: "red",
    bottom: 0,
    "&:hover": {
      backgroundColor: "#BFB4AB",
    },
  },
  loading: {
    backgroundColor: 'white',
    border: '1px solid black',
    width: '40vw',
    marginRight: 'auto',
    marginLeft: 'auto',
  }
}));

const Roomates: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allUsersInfo, setAllUsersInfo] = useState<UserDataInterface[]>([]);
  const context = useContext(UserContext);
  const socket = useContext(SocketContext);
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();

  const firstCard = allUsersInfo[0]

  const handleSwipe = (liked:boolean)=>{
    socket?.emit(
      "like",
      {
       liked,
       activeUser: {id: context.id, name: context.name},
       passiveUser: {id: firstCard.userId, name: firstCard.fullName},
      },
      (matchUsers: any) => {
       if (matchUsers) {
        socket?.emit("match", matchUsers);
       }
      }
     );
     const removedFirstCard = allUsersInfo.slice(1)
     setAllUsersInfo(removedFirstCard)
  }
  
  const fetchData = async () => {
    const { data: user } = await network.get(`api/v1/users/?id=${context.id}`);
    context.name = user[0].name + " " + user[0].lastName;
    const { data: isExist } = await network.get(
     `/api/v1/users/user-data/${context.id}`
    );
    if (isExist.length === 0) {
     history.push("/edit");
    }
    const { data } = await network.get(
     `/api/v1/users/all-cards?userId=${context.id}`
    );
    console.log(data)
    setAllUsersInfo(data);
   };
  console.log(allUsersInfo[0]);
   useEffect(() => {
    fetchData();
   }, []);
  return (
    <div className="cards-page">
      {allUsersInfo[0] ? (
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
              handleSwipe={handleSwipe}
            />
          </AnimatePresence>
        </div>
      ) : (
        <div className={classes.loading}>
          <CircularProgress size={50} />
          Waiting for more cards...
        </div>
      )}
    </div>
  );
}
export default Roomates;
