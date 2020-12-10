/*eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import Cookies from 'js-cookie';
import { Logged } from './context/UserContext';
import './App.css';
// import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PrivateRoutesContainer from './containers/PrivateRoutesContainer';
import network from './utils/network';
import { UserContext } from './context/UserContext';

function App(): JSX.Element {
  // const [logged, setLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const context = React.useContext(UserContext);

  const isLoggedIn = async (): Promise<void> => {
    if (Cookies.get('accessToken')) {
      try {
        const { data } = await network.get('api/v1/auth/validateToken');
        const dataCookie = {
          id: Cookies.get('id'),
          email: Cookies.get('email'),
          accessToken: Cookies.get('accessToken'),
        };

        context.logUserIn({ ...dataCookie, ...data, success: true });
        setLoading(false);
      } catch (e) {
        context.logUserIn({ success: false });
        setLoading(false);
      }
    } else {
      context.logUserIn({ success: false });
      setLoading(false);
    }
  };

  // checks if a user is logged
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <div className='App'>
      <Router>
        {!loading ? (
          context.success ? (
            <Logged.Provider value={context.success}>
              <PrivateRoutesContainer />
            </Logged.Provider>
          ) : (
            <Logged.Provider value={context.success}>
              <Switch>
                <Route exact path='/signup'>
                  {/* <SignUpForm /> */}
                </Route>
                <Route exact path='/signin'>
                  <SignInForm />
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
        ) : (
          <div>were loading...</div>
        )}
      </Router>
    </div>
  );
}

export default App;
