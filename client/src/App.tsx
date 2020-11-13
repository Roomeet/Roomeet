/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch, useHistory, useLocation,
} from 'react-router-dom';
// import {  Router } from 'react-router';
import './App.css';
import Cookies from 'js-cookie';
import SignUpForm from './pages/auth/signUpForm';
import SignInForm from './pages/auth/signInForm';
import PrivateRoutesContainer from './containers/PrivateRoutesContainer';
import network from './utils/network';

function App():JSX.Element {
  const [loggedIn, setLoggedIn] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(true);

  const isLoggedIn = async (): Promise<void> => {
    if (Cookies.get('accessToken')) {
      try {
        const { data } = await network.get('api/v1/auth/validateToken');
        setLoggedIn(data);
        setLoading(false);
      } catch (e) {
        setLoggedIn(false);
        setLoading(false);
      }
    } else {
      setLoggedIn(false);
      setLoading(false);
    }
  };

  // checks if a user is loggedIn
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <Router>
      { !loading ?
          loggedIn ? (
            <PrivateRoutesContainer
              loggedIn={loggedIn}
            />
          )
          : (
            <Switch>
              <Route exact path="/signup">
                <SignUpForm />
              </Route>
              <Route exact path="/signin">
                <SignInForm setLoggedIn={setLoggedIn}/>
              </Route>
              <Route path="/*">
                <Redirect
                  to={{
                    pathname: '/signin',
                  }}
                />
              </Route>
            </Switch>
        )
        : <div>were loading...</div>
      }
    </Router>
  );
}

export default App;
