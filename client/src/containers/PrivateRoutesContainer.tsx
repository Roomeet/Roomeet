import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PrivateRoute from '../components/PrivateRoute';
import Roomates from '../pages/roomates/Roomates';
import UserDataForm from '../pages/preferences-form/UserDataForm';
import NavBar from '../components/NavBar';
import AboutPage from '../pages/footers/AboutPage';
import TermsConditionPage from '../pages/footers/TermsConditionPage';
import ContactUsPage from '../pages/footers/ContactUsPage';

const PrivateRoutesContainer: React.FC = () => (
  <div>
    {/* <NavBar /> */}
    <PrivateRoute exact path="/home">
      <div>
        <Roomates />
      </div>
    </PrivateRoute>
    <PrivateRoute exact path="/profile">
      <div id="private-routes">
        <UserDataForm />
      </div>
    </PrivateRoute>
    <Route path="/*">
      <Redirect
        to={{
          pathname: '/home',
        }}
      />
    </Route>
  </div>
);

export default PrivateRoutesContainer;
