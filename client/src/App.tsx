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
import { UserContext } from './context/UserContext';
import Landing from './pages/landing/Landing';
import Footer from './components/Footer';
import AboutPage from './pages/footers/AboutPage';
import TermsConditionPage from './pages/footers/TermsConditionPage';
import ContactUsPage from './pages/footers/ContactUsPage';
import NavBar from './components/NavBar';
import BGImage from './images/woodBG.jpg';
import Messenger from './containers/Messenger';
import makeToast from './utils/Toaster';
import SocketContext from './context/socketContext';
import { chatRoomI } from './interfaces/chat';

function App(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>(undefined);
  const [messengerOpen, setMessengerOpen] = useState<boolean>(false);
  const [openChatRooms, setOpenChatrooms] = useState<chatRoomI[]>([]);
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
        });

        setSocket(newSocket);
      } catch (error) {
        makeToast('error', 'Error connecting!');
      }
    }
  };

  const openChatRoom = (chatroom: chatRoomI) => {
    setOpenChatrooms((prevOpenChatRooms: chatRoomI[]) => {
      const prevOpenChatroomsIds = prevOpenChatRooms.map(chatroom => chatroom.id)
      if (!prevOpenChatroomsIds.includes(chatroom.id)) {
        return [...prevOpenChatRooms, chatroom];
      }
      return prevOpenChatRooms;
    });
  };
  
  const closeChatRoom = (chatroom: chatRoomI) => {
    setOpenChatrooms((prevOpenChatRooms: chatRoomI[]) => {
      const prevOpenChatroomsIds = prevOpenChatRooms.map(chatroom => chatroom.id)
      const index = prevOpenChatroomsIds.indexOf(chatroom.id);
      prevOpenChatRooms.splice(index, 1);
      return [...prevOpenChatRooms];
    });
  };

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
        const { data: user } = await network.get(`api/v1/users/?id=${id}`);
        context.logUserIn({ ...dataCookie, ...data, name: user[0].name + " " + user[0].lastName, success: true });
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
              <NavBar
                setMessengerOpen={setMessengerOpen}
                openChatRooms={openChatRooms}
                closeChatRoom={closeChatRoom}
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
                <SocketContext.Provider value={socket}>
                  <Logged.Provider value={context.success}>
                    <Messenger
                      messengerOpen={messengerOpen}
                      openChatRoom={openChatRoom}
                      />
                    <PrivateRoutesContainer />
                  </Logged.Provider>
                </SocketContext.Provider>
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
