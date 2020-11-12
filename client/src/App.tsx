import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import { isLoggedIn } from './components/auth/loginLogout';
import SignUpForm from './components/signUpForm';
import PrivateRoutesContainer from './containers/PrivateRoutesContainer';

function App():JSX.Element {
  const [loggedIn, setLoggedIn] = useState<boolean>()

  useEffect(() => {setLoggedIn(isLoggedIn())})

  return (
    <div className="App">
    {loggedIn ?
      <PrivateRoutesContainer
      loggedIn={loggedIn}
      />
    :
    <Switch>
      <Route exact path="/signup">
        <SignUpForm/>
      </Route>
      <Route exact path="/signin">
        <SignInForm/>
      </Route>
      <Route path="/*">
        <Redirect
          to={{
            pathname: "/signin",
          }}
        />
      </Route>
    </Switch> 
    }
    </div>
  );
}

export default App;
