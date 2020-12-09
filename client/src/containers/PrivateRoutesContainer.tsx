import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PrivateRoute from '../components/PrivateRoute';
import Roomates from '../pages/roomates/roomates';
import BGImage from '../images/woodBG.jpg';
import UserDataForm from '../pages/user-data form/userDataForm';

// interface Props {}

const PrivateRoutesContainer: React.FC = () => (
  <div id="private-routes" style={{ backgroundImage: `url(${BGImage})` }}>
    <Switch>
      <PrivateRoute exact path="/home">
        <Roomates />
      </PrivateRoute>
      <PrivateRoute exact path="/userDataForm">
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
