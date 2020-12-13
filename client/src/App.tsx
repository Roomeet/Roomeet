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
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PrivateRoutesContainer from './containers/PrivateRoutesContainer';
import network from './utils/network';
import { UserContext } from './context/UserContext';
import Landing from './pages/landing/Landing';
import Footer from './components/Footer';
import AboutPage from './pages/footers/AboutPage';
import TermsConditionPage from './pages/footers/TermsConditionPage';
import ContactUsPage from './pages/footers/ContactUsPage';
import NavBar from './components/NavBar';
import BGImage from './images/woodBG.jpg';



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
    console.log(context.success);
    isLoggedIn();
  }, []);

  return (
    <div className="App">
      <Router>
        {!loading ? (
          context.success ? (
            <div id="private-routes" style={{ backgroundImage: `url(${BGImage})` }}>
              <NavBar />
              <Switch>
                <Route exact path='/about'>
                  <AboutPage />
                </Route>
                <Route exact path='/term-and-conditions'>
                  <TermsConditionPage />
                </Route>
                <Route exact path='/contact-us'>
                  <ContactUsPage />
                </Route>
                <Logged.Provider value={context.success}>
                  <PrivateRoutesContainer />
                </Logged.Provider>
              </Switch>
            </div>
          ) : (
            <Logged.Provider value={context.success}>
              <Switch>
                <Route exact path='/signup'>
                  <SignUpForm />
                </Route>
                <Route exact path='/signin'>
                  <SignInForm />
                </Route>
                <Route exact path='/landing'>
                  <Landing />
                </Route>
                <Route exact path='/about'>
                  <AboutPage />
                </Route>
                <Route exact path='/term-and-conditions'>
                  <TermsConditionPage />
                </Route>
                <Route exact path='/contact-us'>
                  <ContactUsPage />
                </Route>
                <Route path='/*'>
                  <Redirect
                    to={{
                      pathname: '/landing',
                    }}
                  />
                </Route>
              </Switch>
            </Logged.Provider>
          )
        ) : (
          <div>We're Loading...</div>
        )}
      <Footer />
      </Router>
    </div>
  );
}

export default App;
