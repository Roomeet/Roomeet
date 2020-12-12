import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PrivateRoute from '../components/PrivateRoute';
import Roomates from '../pages/roomates/Roomates';
import BGImage from '../images/woodBG.jpg';
import UserDataForm from '../pages/preferences-form/UserDataForm';
import NavBar from '../components/NavBar';
// interface Props {}

const PrivateRoutesContainer: React.FC = () => (
  <div id="private-routes" style={{ backgroundImage: `url(${BGImage})` }}>
    {/* <NavBar /> */}
    <Switch>
      <PrivateRoute exact path="/home">
        <Roomates />
      </PrivateRoute>
      <PrivateRoute exact path="/profile">
        <UserDataForm />
      </PrivateRoute>
      <Route path="/*">
        <Redirect
          to={{
            pathname: '/home',
          }}
        />
      </Route>
    </Switch>
  </div>
);

export default PrivateRoutesContainer;
