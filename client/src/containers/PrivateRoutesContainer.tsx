import React from 'react';
import { Switch } from 'react-router';
import PrivateRoute from '../components/auth/PrivateRoute';
import { isLoggedIn, logout } from '../components/auth/loginLogout';

export interface Props {
    loggedIn: boolean;
}

const PrivateRoutesContainer: React.FC<Props> = ({ loggedIn }) => (
  <div>
    <Switch>
      <PrivateRoute loggedIn={loggedIn} exact path="/">
        <h1>PrivateRoute</h1>
        {/* <RoomatesContainer /> */}
      </PrivateRoute>
    </Switch>
  </div>
);

export default PrivateRoutesContainer;
