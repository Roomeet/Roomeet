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
import ChatBox from '../pages/chat/ChatBox';

const PrivateRoutesContainer: React.FC = () => (
  <div id="private-routes" style={{ backgroundImage: `url(${BGImage})` }}>
    <NavBar />
    <Switch>
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
      <PrivateRoute exact path="/messages">
        <div id="private-routes">
          <ChatBox />
        </div>
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
