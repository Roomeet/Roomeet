import React from 'react';
import { Redirect, Route } from 'react-router';
import PrivateRoute from '../components/PrivateRoute';
import RoomatesWithAnimate from '../pages/roomates/RoomatesWithAnimate';
import UserDataForm from '../pages/preferences-form/UserDataForm';
import MyProfile from '../pages/profile/MyProfile';

const PrivateRoutesContainer: React.FC = () => (
  <>
    <PrivateRoute exact path="/home">
      <RoomatesWithAnimate />
      {/* <Roomates /> */}
    </PrivateRoute>
    <PrivateRoute exact path="/myProfile">
      <MyProfile />
    </PrivateRoute>
    <PrivateRoute exact path="/edit">
        <UserDataForm />
    </PrivateRoute>
    <Route path="/*">
      <Redirect
        to={{
          pathname: '/home',
        }}
      />
    </Route>
  </>
);

export default PrivateRoutesContainer;
