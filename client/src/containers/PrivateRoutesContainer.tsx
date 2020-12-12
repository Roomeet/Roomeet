import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PrivateRoute from '../components/PrivateRoute';
import Roomates from '../pages/roomates/Roomates';
import BGImage from '../images/woodBG.jpg';
import UserDataForm from '../pages/preferences-form/UserDataForm';
import NavBar from '../components/NavBar';
import AboutPage from '../pages/footers/AboutPage';
import TermsConditionPage from '../pages/footers/TermsConditionPage';
import ContactUsPage from '../pages/footers/ContactUsPage';

const PrivateRoutesContainer: React.FC = () => (
  <div id="private-routes" style={{ backgroundImage: `url(${BGImage})` }}>
    <NavBar />
    <Switch>
      <PrivateRoute exact path="/home">
        <Roomates />
      </PrivateRoute>
      <PrivateRoute exact path="/profile">
        <UserDataForm />
      </PrivateRoute>
      <PrivateRoute exact path="/about">
        <AboutPage />
      </PrivateRoute>
      <PrivateRoute exact path="/term-and-conditions">
        <TermsConditionPage />
      </PrivateRoute>
      <PrivateRoute exact path="/contact-us">
        <ContactUsPage />
      </PrivateRoute>
      <Route path="/*">
        <Redirect
          to={{
            pathname: '/home',
          }}
        />
      </Route>
    </Switch>
    {/* <Footer /> */}
  </div>
);

export default PrivateRoutesContainer;
