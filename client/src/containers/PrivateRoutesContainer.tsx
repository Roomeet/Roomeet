import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PrivateRoute from '../components/PrivateRoute';

interface Props {
    loggedIn: boolean;
}

const PrivateRoutesContainer: React.FC<Props> = ({ loggedIn }) => (
  <div>
    <Switch>
      <PrivateRoute loggedIn={loggedIn} exact path="/home">
        <h1>You Have Entered Roomeet</h1>
        {/* <RoomatesContainer /> */}
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
