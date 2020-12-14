import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../context/UserContext';

const Messenger: React.FC = () => {
  const [socket, setSocket] = useState<any>(null);
  const user = useContext(UserContext);

  const setupSocket = () => {
    if (!socket) {
      try {
        const newSocket = io('/api/v1/chatroom/');

        newSocket.on('disconnect', () => {
          setSocket(null);
          setTimeout(setupSocket, 3000);
          console.log('client-socket disconnected');
        });

        newSocket.on('connect', () => {
          console.log('client-socket connected');
        });

        setSocket(newSocket);
      } catch (error) {
        console.log('error in socket');
      }
    }
  };

  React.useEffect(() => {
    setupSocket();
    console.log(socket);
  }, [socket]);

  return (
    <div>
      This is the messenger
    </div>
  );
};

export default Messenger;
