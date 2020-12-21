import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PrivateRoute from '../components/PrivateRoute';
import RoomatesWithAnimate from '../pages/roomates/RoomatesWithAnimate';
import Roomates from '../pages/roomates/Roomates';
import UserDataForm from '../pages/preferences-form/UserDataForm';
import NavBar from '../components/NavBar';
import AboutPage from '../pages/footers/AboutPage';
import TermsConditionPage from '../pages/footers/TermsConditionPage';
import ContactUsPage from '../pages/footers/ContactUsPage';
import MyProfile from '../pages/profile/MyProfile';

const PrivateRoutesContainer: React.FC = () => (
  <>
    <PrivateRoute exact path="/home">
      <div>
        <RoomatesWithAnimate />
        {/* <Roomates /> */}
      </div>
    </PrivateRoute>
    <PrivateRoute exact path="/myProfile">
      <div id="private-routes">
        <MyProfile />
      </div>
    </PrivateRoute>
    <PrivateRoute exact path="/edit">
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
  </>
);

export default PrivateRoutesContainer;
