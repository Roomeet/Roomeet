/*eslint-disable */
import React, { useEffect, useState, useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Drawer, Button, Typography } from '@material-ui/core';
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
    width: "100%",
    height: "90vh",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: "#3d5a80",
    fontFamily: "fantasy",
    opacity: 0.8,
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
    backgroundColor: "#3d5a80",
    bottom: 0,
    fontFamily: "fantasy",
  },
  like: {
    fill: "green",
    bottom: 0,
    "&:hover": {
      backgroundColor: "#3d5a80",
    },
  },
  unlike: {
    fill: "red",
    bottom: 0,
    "&:hover": {
      backgroundColor: "#3d5a80",
    },
  },
  loading: {
    height: "auto",
    margin: "auto",
    padding: "10px",
    position: "relative",
    top: "40%",
  },
  cardsContainer: {
    flexGrow: 1,
    overflowX: "hidden",
    height: "90vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
  },
  filterButton: {
    marginRight: "auto",
    border: "2px solid #293241",
    marginTop: "2vh",
    backgroundColor: "#293241",
  },
  searchIconRestile: {
    fill: "white",
    fontSize: "1.2em",
  },
}));

const Roomates: React.FC = () => {
  const [allUsersInfo, setAllUsersInfo] = useState<UserDataInterface[]>([]);
  const [openFil, setOpenFil] = useState<boolean>(false)
  const [filters, setFilters] = useState({
    gender: '',
    smoke: false,
    pet: false,
    relationship: false,
    religion: false,
    employed: false,
    budgetRange: [500, 6000],
    ageRange: [16, 60],
  });
  const [overTime, setOverTime] = useState<boolean>(false);
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

  const handleRefreshSearch = async () => {
    setFilters({
      gender: '',
      smoke: false,
      pet: false,
      relationship: false,
      religion: false,
      employed: false,
      budgetRange: [500, 6000],
      ageRange: [16, 60],
    });
    const { data } = await network.get(
      `/api/v1/users/all-cards?userId=${context.id}`,
    );
    setAllUsersInfo(data);
    setOverTime(false);
  };

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
  
  useEffect(() => {
    setTimeout(() => {
      if(allUsersInfo.length === 0) setOverTime(true);
      clearTimeout();
    }, 7000);
  }, [allUsersInfo]);

  function closeMenu (){
    setOpenFil(false)
  } 
  return allUsersInfo[0] ? (
    <div>
      <Paper square elevation={0} className={classes.header}>
        <IconButton
          style={{}}
          edge="start"
          color="inherit"
          aria-label="open drawer"
          className={classes.filterButton}
          onClick={handleOpenFilter}
        >
          <SearchIcon className={classes.searchIconRestile} />
        </IconButton>
      </Paper>
      <div className={classes.cardsContainer}>
        <Drawer
          open={openFil}
          anchor="left"
          onClose={handleOpenFilter}
          // variant="persistent"
        >
          <FilterBar
            className={classes.headerText}
            setAllUsersInfo={setAllUsersInfo}
            userId={context.id}
            closeMenu={closeMenu}
            filters={filters}
            setFilters={setFilters}
            setOverTime={setOverTime}
          />
        </Drawer>
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
      {overTime ? (
        <div>
          <Typography>
            Sorry we didn't find potential roomates for you, you can refresh
            your search here:
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRefreshSearch}
            size="small"
          >
            Get all the Roomates
          </Button>
        </div>
      ) : (
        <div>
          <CircularProgress size={50} />
          Searching for more cards...
        </div>
      )}
    </div>
  );
};
export default Roomates;
