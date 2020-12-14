import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { UserContext } from '../context/UserContext';

const ChatRoom: React.FC = () => (
  <div>
    This is the chatroom
  </div>
);

export default ChatRoom;
