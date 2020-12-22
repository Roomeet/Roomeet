/*eslint-disable */
import React, { useEffect, useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import network from "../../utils/network";
import { UserDataInterface } from "../../interfaces/userData";
import RoomateCard from "../../components/RoomateCard";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./roomates.css";
import SocketContext from "../../context/socketContext";

const useStyles = makeStyles((theme) => ({
 root: {
  flexGrow: 1,
  width: "100%",
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
}));

const Roomates: React.FC = () => {
 const [loading, setLoading] = useState<boolean>(false);
 const [allUsersInfo, setAllUsersInfo] = useState<UserDataInterface[]>([]);
 const [activeStep, setActiveStep] = useState(0);
 const context = useContext(UserContext);
 const socket = useContext(SocketContext);
 const history = useHistory();
 const classes = useStyles();
 const theme = useTheme();

 const handleNext = async (liked: boolean) => {
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
  socket?.emit(
   "like",
   {
    liked,
    activeUser: {id: context.id, name: context.name},
    passiveUser: {id: allUsersInfo[activeStep].userId, name: allUsersInfo[activeStep].fullName},
   },
   (matchUsers: any) => {
    if (matchUsers) {
     socket?.emit("match", matchUsers);
    }
   }
  );
 };

 const handleStepChange = (step: number) => {
  setActiveStep(step);
 };

 const fetchData = async () => {
  const { data: user } = await network.get(`api/v1/users/?id=${context.id}`);
  context.name = user[0].name + " " + user[0].lastName;
  const { data: isExist } = await network.get(
   `/api/v1/users/user-data/${context.id}`
  );
  if (isExist.length === 0) {
    console.log('dadsadas',isExist)
   history.push("/edit");
  }
  const { data } = await network.get(
   `/api/v1/users/all-cards?userId=${context.id}`
  );
  setAllUsersInfo(data);
 };

 useEffect(() => {
  fetchData();
 }, []);

 return (
  <div className="cards-page">
   {!loading && allUsersInfo[0] ? (
    <div className={classes.root}>
     <SwipeableViews
      axis={theme.direction === "rtl" ? "x-reverse" : "x"}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
     >
      {allUsersInfo.map((userInfo: UserDataInterface, index: number) => (
       <div className={classes.item} key={index}>
        {Math.abs(activeStep - index) <= 2 ? (
         <RoomateCard
          userInfo={userInfo}
          handleNext={handleNext}
          activeStep={activeStep}
          length={allUsersInfo.length}
         />
        ) : null}
       </div>
      ))}
     </SwipeableViews>
    </div>
   ) : (
    <div>loading...</div>
   )}
  </div>
 );
};

export default Roomates;
