/*eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch, useHistory, useLocation,
} from 'react-router-dom';
import Cookies from 'js-cookie';
import { Logged } from './context/LoggedInContext';
import './App.css';
import SignUpForm from './pages/auth/signUpForm';
import SignInForm from './pages/auth/signInForm';
import PrivateRoutesContainer from './containers/PrivateRoutesContainer';
import network from './utils/network';
import Loading from './components/Loading';

function App():JSX.Element {
  const [logged, setLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const isLoggedIn = async (): Promise<void> => {
    if (Cookies.get('accessToken')) {
      try {
        const { data } = await network.get('api/v1/auth/validateToken');
        setLogged(data);
        setLoading(false);
      } catch (e) {
        setLogged(false);
        setLoading(false);
      }
    } else {
      setLogged(false);
      setLoading(false);
    }
  };

  // checks if a user is logged
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <Router>
      { !loading ?
          logged ? (
            <Logged.Provider value={logged}>
              <PrivateRoutesContainer/>
            </Logged.Provider>
          )
            : (
            <Logged.Provider value={logged}>
              <Switch>
                <Route exact path='/loading'>
                  <Loading />
                </Route>
                <Route exact path='/signup'>
                  <SignUpForm />
                </Route>
                <Route exact path='/signin'>
                  <SignInForm setLogged={setLogged}/>
                </Route>
                <Route path='/*'>
                  <Redirect
                    to={{
                      pathname: '/signin',
                    }}
                    />
                </Route>
              </Switch>
            </Logged.Provider>
        )
        : <div>were loading...</div>
      }
    </Router>
  );
}

export default App;
