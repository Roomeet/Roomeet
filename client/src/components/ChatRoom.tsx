import React, {
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import io from 'socket.io-client';
import { UserContext } from '../context/UserContext';
import network from '../utils/network';

type chatRoomProps = {
  socket: any;
  chatRoomId: string;
}

type messageType = {
  message: string;
  name: string;
  id: string;
}

const ChatRoom: React.FC<chatRoomProps> = ({ socket, chatRoomId }) => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const messageRef = useRef<any>();

  const sendMessage = () => {
    if (socket) {
      socket.emit('chatroomMessage', {
        chatRoomId,
        message: messageRef.current.value,
      });

      messageRef.current.value = '';
    }
  };

  const getMessages = async () => {
    try {
      const { data } = await network.get(`http://localhost:3002/messenger/chatroom/${chatRoomId}`);
      console.log(data);
      setMessages(data);
    } catch (err) {
      setTimeout(getMessages, 3000);
    }
  };

  React.useEffect(() => {
    if (socket) {
      socket.on('newMessage', (message: messageType) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
    }
  }, [messages]);

  React.useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', {
        chatRoomId,
      });
    }

    return () => {
      if (socket) {
        socket.emit('leaveRoom', {
          chatRoomId,
        });
      }
    };
  }, []);

  return (
    <div>
      This is the chatroom
      {messages.map((message) => (
        <div>
          {message}
        </div>
      ))}
    </div>
  );
};

export default ChatRoom;
