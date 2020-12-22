/*eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { Logged } from './context/UserContext';
import './App.css';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PrivateRoutesContainer from './containers/PrivateRoutesContainer';
import network from './utils/network';
import Loading from './components/Loading';
import { UserContext } from './context/UserContext';
import Landing from './pages/landing/Landing';
import Footer from './components/Footer';
import AboutPage from './pages/footers/AboutPage';
import TermsConditionPage from './pages/footers/TermsConditionPage';
import ContactUsPage from './pages/footers/ContactUsPage';
import NavBar from './components/NavBar';
import BGImage from './images/woodBG.jpg';
// import Animtest from './Animtest'
import Animtest from './components/SwipeTest'
import Messenger from './containers/Messenger';
import Notifications from './containers/Notifications';
import makeToast from './utils/Toaster';
import SocketContext from './context/socketContext';
import { chatRoomI } from './interfaces/chat';
import { NotificationI } from './interfaces/notification';

function App(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>(undefined);
  const [openDrawer, setOpenDrawer] = useState<string>('');
  const [activeChatrooms, setActiveChatrooms] = useState<chatRoomI[]>([]);
  const [allNotifications, setAllNotifications] = React.useState<NotificationI[] | null>(null);
  const context = React.useContext(UserContext);

  const setupSocket = () => {
    if (!socket && context.id) {
      try {
        const newSocket = io('http://localhost:3002', {
          query: {
            userId: context.id,
          },
        });

        newSocket.on('disconnect', () => {
          setSocket(undefined);
          setTimeout(setupSocket, 3000);
          makeToast('error', 'Disconnected!');
        });

        newSocket.on('connect',  () => {
          makeToast('success', 'Connected!');
        });

        newSocket.on('match', () => {
          makeToast('info', 'You got a new match!');
          fetchAllNotifications();
        });

        setSocket(newSocket);
      } catch (error) {
        makeToast('error', 'Error connecting!');
      }
    }
  };

  const openNavDrawer = (drawer: string) => {
    let open = false;
    setOpenDrawer((prev) => {
      if (prev === drawer) {
        return '';
      } 
      open = false;
      return drawer;
    });
    return open
  }

  const openChatRoom = (chatroom: chatRoomI) => {
    setActiveChatrooms((prevactiveChatrooms: chatRoomI[]) => {
      const prevActiveChatroomsIds = prevactiveChatrooms.map(chatroom => chatroom.id)
      if (!prevActiveChatroomsIds.includes(chatroom.id)) {
        return [chatroom , ...prevactiveChatrooms];
      }
      return prevactiveChatrooms;
    });
  };
  
  const closeChatRoom = (chatroom: chatRoomI) => {
    setActiveChatrooms((prevactiveChatrooms: chatRoomI[]) => {
      const prevActiveChatroomsIds = prevactiveChatrooms.map(chatroom => chatroom.id)
      const index = prevActiveChatroomsIds.indexOf(chatroom.id);
      prevactiveChatrooms.splice(index, 1);
      return [...prevactiveChatrooms];
    });
  };

  const fetchAllNotifications = async () => {
    try {
      const { data } = await network.get(`http://localhost:3002/api/v1/notifications/userId/${context.id}`);
      setAllNotifications(data);
    } catch (err) {
      setTimeout(fetchAllNotifications, 3000);
    }
  }

  const isLoggedIn = async (): Promise<void> => {
    if (Cookies.get('accessToken')) {
      try {
        const { data } = await network.get('api/v1/auth/validateToken');
        const id = Cookies.get('id');
        const dataCookie = {
          id,
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

  // Socket connection
  useEffect(() => {
    setupSocket();
    fetchAllNotifications();
    // socket?.emit('relateToUser', context.id);
  }, [context]);

  // checks if a user is logged
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <div className="App">
      <Router>
        {!loading ? (
          context.success ? (
            <div id="private-routes" style={{ backgroundImage: `url(${BGImage})` }}>
              <SocketContext.Provider value={socket}>
                <Logged.Provider value={context.success}>
                  <NavBar
                    openNavDrawer={openNavDrawer}
                    activeChatrooms={activeChatrooms}
                    closeChatRoom={closeChatRoom}
                  />
                  <Messenger
                    openChatRoom={openChatRoom}
                    messengerOpen={openDrawer === 'messenger'}
                  />
                  <Notifications
                    allNotifications={allNotifications}
                    notificationsOpen={openDrawer === 'notifications'}
                  />
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
                    <PrivateRoutesContainer />
                  </Switch>
                </Logged.Provider>
              </SocketContext.Provider>
            </div>
          ) : (
            <Logged.Provider value={context.success}>
              <Switch>
                <Route exact path='/ala'>
                  <Animtest />
                </Route>
                <Route exact path='/loading'>
                  <Loading />
                </Route>
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
        ) 
        :<div>We're Loading...</div>
        }
      <Footer />
      </Router>
    </div>
  );
}

export default App;
