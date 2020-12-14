import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { UserContext } from '../context/UserContext';
import makeToast from '../utils/Toaster';
import ChatRoom from '../components/ChatRoom';
import network from '../utils/network';

type messengerProps = {
  messengerOpen: boolean
}

const Messenger: React.FC<messengerProps> = ({ messengerOpen }) => {
  const [socket, setSocket] = useState<any>(null);
  const [chatrooms, setChatrooms] = useState<any[]>([]);
  const user = useContext(UserContext);

  const getChatrooms = async () => {
    try {
      const response = await network.get(`http://localhost:3002/messenger/chatroom/${user.id}`);
      console.log(response);
      setChatrooms(response.data);
    } catch (error) {
      console.log('Not Happend');
      setTimeout(getChatrooms, 3000);
    }
  };

  const setupSocket = () => {
    if (!socket) {
      try {
        const newSocket = io('http://localhost:3002', {
          query: {
            userId: user.id,
          },
        });

        newSocket.on('disconnect', () => {
          setSocket(null);
          setTimeout(setupSocket, 3000);
          makeToast('error', 'Socket Disconnected!');
        });

        newSocket.on('connect', () => {
          console.log('client-socket connected');
          makeToast('success', 'Socket Connected!');
        });

        setSocket(newSocket);
      } catch (error) {
        console.log('error in socket');
      }
    }
  };

  React.useEffect(() => {
    setupSocket();
    getChatrooms();
  }, []);

  return (
    <>
      {
        messengerOpen
          ? (
            <div className="card">
              <div className="cardHeader">Chatrooms</div>
              <div className="cardBody">
                <div className="inputGroup">
                  <label htmlFor="chatroomName">Chatroom Name</label>
                  <input
                    type="text"
                    name="chatroomName"
                    id="chatroomName"
                    placeholder="ChatterBox Nepal"
                  />
                </div>
              </div>
              <button>Create Chatroom</button>
              <div className="chatrooms">
                {chatrooms[0] ? chatrooms.map((chatroom) => (
                  <ChatRoom socket={socket} chatRoomId={chatroom._id} />
                )) : <div>No chat rooms for you buddy</div>}
              </div>
            </div>
          )
          : (
            <div>
              This is the messenger and its closed
            </div>
          )
      }
    </>
  );
};

export default Messenger;
