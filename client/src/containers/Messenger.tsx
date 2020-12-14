import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../context/UserContext';

type messengerProps = {
  messengerOpen: boolean
}

const Messenger: React.FC<messengerProps> = ({ messengerOpen }) => {
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
  }, []);

  return (
    <>
      {
        messengerOpen
          ? (
            <div>
              This is the messenger and its open
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
