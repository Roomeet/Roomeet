/*eslint-disable */
import React, { useEffect, useState, useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Drawer } from '@material-ui/core';
import network from '../../utils/network';
import { UserDataInterface } from '../../interfaces/userData';
import RoomateCard from '../../components/RoomateCardAnimate';
// import RoomateCard from '../../components/cardnomui';
import { motion, AnimatePresence } from 'framer-motion';
import { UserContext } from '../../context/UserContext';
import SocketContext from "../../context/socketContext";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import FilterBar from '../../components/FilterBar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';




const useStyles = makeStyles((theme) => ({
  root: {

    width: '100%',
    height: '90vh',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: '#98c1d9',
    fontFamily: 'fantasy',
  },
  headerText: {
    fontFamily: 'fantasy',
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  item: {
    display: 'block',
    top: '50%',
    overflow: 'hidden',
    width: '100%',
  },
  footer: {
    backgroundColor: '#3d5a80',
    bottom: 0,
    fontFamily: 'fantasy',
  },
  like: {
    fill: 'green',
    bottom: 0,
    '&:hover': {
      backgroundColor: '#3d5a80',
    },
  },
  unlike: {
    fill: 'red',
    bottom: 0,
    '&:hover': {
      backgroundColor: '#3d5a80',
    },
  },
  loading: {
    height: 'auto',
    margin: 'auto',
    padding: '10px',
    position: 'relative',
    top: '40%',
  },
  cardsContainer: {
    flexGrow: 1,
    overflowX: 'hidden',
    height: '90vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
  },
  filterButton: {
    marginRight: 'auto',
  },
}));

const Roomates: React.FC = () => {
  const [allUsersInfo, setAllUsersInfo] = useState<UserDataInterface[]>([]);
  const [openFil, setOpenFil] = useState<boolean>(false)
  const context = useContext(UserContext);
  const socket = useContext(SocketContext);
  const history = useHistory();
  const classes = useStyles();

  const firstCard = allUsersInfo[0];

  const handleSwipe = (liked: boolean) => {
    socket?.emit(
      'like',
      {
        liked,
        activeUser: { id: context.id, name: context.name },
        passiveUser: { id: firstCard.userId, name: firstCard.fullName },
      },
      (matchUsers: any) => {
        if (matchUsers) {
          socket?.emit('match', matchUsers);
        }
      }
    );
    const removedFirstCard = allUsersInfo.slice(1);
    setAllUsersInfo(removedFirstCard);
  };

  const handleOpenFilter = () => {
    setOpenFil((prev)=> !prev);
  }

  const fetchData = async () => {
    const { data: user } = await network.get(`api/v1/users/?id=${context.id}`);
    context.name = user[0].name + ' ' + user[0].lastName;
    const { data: isExist } = await network.get(
      `/api/v1/users/user-data/${context.id}`
    );
    if (isExist.length === 0) {
      history.push('/edit');
    }
    const { data } = await network.get(
      `/api/v1/users/all-cards?userId=${context.id}`
    );
    setAllUsersInfo(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return allUsersInfo[0] ? (
    <div>
      <Paper square elevation={0} className={classes.header}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          className={classes.filterButton}
          onClick={handleOpenFilter}
        >
          <SearchIcon />
        </IconButton>
        <Drawer
          open={openFil}
          anchor="left"
          onClose={handleOpenFilter}
          variant="persistent"
        >
          <FilterBar
            className={classes.headerText}
            setAllUsersInfo={setAllUsersInfo}
            userId={context.id}
          />
          <button onClick={handleOpenFilter}>Close Filter</button>
        </Drawer>
      </Paper>
      <div className={classes.cardsContainer}>
        <AnimatePresence exitBeforeEnter initial={false}>
          <RoomateCard
            key={firstCard.id}
            userInfo={firstCard}
            handleSwipe={handleSwipe}
          />
        </AnimatePresence>
      </div>
    </div>
  ) : (
    <div className={classes.loading}>
      <CircularProgress size={50} />
      Waiting for more cards...
    </div>
  );
};
export default Roomates;
