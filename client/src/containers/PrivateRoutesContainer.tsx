import React from 'react';
import { Redirect, Route } from 'react-router';
import PrivateRoute from '../components/PrivateRoute';
import Roomates from '../pages/roomates/Roomates';
import UserDataForm from '../pages/preferences-form/UserDataForm';
import MyProfile from '../pages/profile/MyProfile';
// import Messenger from './Messenger';

const PrivateRoutesContainer: React.FC = () => (
  <>
    <PrivateRoute exact path="/home">
      <div>
        <Roomates />
      </div>
    </PrivateRoute>
    <PrivateRoute exact path="/myProfile">
      <div id="private-routes">
        <MyProfile />
      </div>
    </PrivateRoute>
    <PrivateRoute exact path="/edit">
      <div id="private-routes">
        <UserDataForm />
      </div>
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
