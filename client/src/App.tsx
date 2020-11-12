import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
// import {  Router } from 'react-router';
import './App.css';
// import { isLoggedIn } from './components/auth/loginLogout';
import SignUpForm from './components/signUpForm';
import SignInForm from './components/signInForm';
import PrivateRoutesContainer from './containers/PrivateRoutesContainer';

const isLoggedIn = (): boolean => {
  if (localStorage.getItem('token')) {
    console.log('logged in');
    return true;
  }
  return false;
};

function App():JSX.Element {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => { setLoggedIn(isLoggedIn()); }, []);
  // useEffect(() => { console.log(isLoggedIn()); }, []);
  return (
    <div className="App">
      <Router>
        {loggedIn
          ? (
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
                <SignInForm />
              </Route>
              <Route path="/*">
                <Redirect
                  to={{
                    pathname: '/signin',
                  }}
                />
              </Route>
            </Switch>
          )}
      </Router>
    </div>
  );
}

export default App;
