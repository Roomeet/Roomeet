import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../context/UserContext';
import makeToast from '../utils/Toaster';

const Messenger: React.FC = () => {
  const [socket, setSocket] = useState<any>(null);
  const user = useContext(UserContext);

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
    console.log(socket);
  }, []);

  return (
    <div>
      This is the messenger
    </div>
  );
};

export default Messenger;
