import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
// import {  Router } from 'react-router';
import './App.css';
import { isLoggedIn } from './utils/authUtils';
import SignUpForm from './components/auth/signUpForm';
import SignInForm from './components/auth/signInForm';
import PrivateRoutesContainer from './containers/PrivateRoutesContainer';

function App():JSX.Element {
  const [loggedIn, setLoggedIn] = useState<boolean>();

  useEffect(() => { 
    setLoggedIn(isLoggedIn()); 
  }, []);

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
