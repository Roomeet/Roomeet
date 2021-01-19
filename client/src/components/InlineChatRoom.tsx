import React, {
  Dispatch, SetStateAction, useContext, useEffect, useState,
} from 'react';
import {
  Avatar,
  createStyles,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
}
  from '@material-ui/core';
import { chatRoomI, messageI } from '../interfaces/chat';
import { UserContext } from '../context/UserContext';
import { getChatroomName } from '../utils/chat';
import network from '../utils/network';
import { getImageBase64String } from '../utils/image';

type chatRoomProps = {
  chatroom: chatRoomI;
  openChatRoom: (chatroom: chatRoomI) => void
  setMessengerOpen: Dispatch<SetStateAction<boolean>>;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  profilePic: {
    height: '50px',
    width: '50px',
    border: '1px solid white',
  },
}));

const InlineChatRoom: React.FC<chatRoomProps> = ({ chatroom, openChatRoom, setMessengerOpen }) => {
  const classes = useStyles();
  const context = useContext(UserContext);
  const [lastMessage, setLastMessage] = useState<messageI | null>(null);
  const [image, setImage] = useState<Buffer>();

  const fetchFirstMessage = async () => {
    try {
      const { data } = await network.get(`/api/v1/messenger/chatrooms/${chatroom.id}/lastMessage`);
      setLastMessage(data);
    } catch (err) {
      setTimeout(fetchFirstMessage, 3000);
    }
  };

  const onInlineChatRoomClick = () => {
    openChatRoom(chatroom);
    setMessengerOpen(false);
  };

  const getProfilePicture = async () => {
    const { data } = await network.get(`/server/api/v1/users/basic-info/picture?id=${chatroom.participants[0]}`);
    setImage(data);
  };

  useEffect(() => {
    fetchFirstMessage();
    getProfilePicture();
  }, []);

  return (
    <React.Fragment key={chatroom.id}>
      <ListItem button onClick={onInlineChatRoomClick}>
        <ListItemAvatar>
          <Avatar>
            <img
              alt="profilePic"
              className={classes.profilePic}
              src={
                image
                  && `data:image/jpg;base64,${getImageBase64String(
                    image,
                  )}`
                  // : `https://picsum.photos/seed/${chatroom.participants[0]}/150/150`
              }
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={getChatroomName(chatroom.name, context.name)}
          secondary={lastMessage?.message}
        />
      </ListItem>
    </React.Fragment>
  );
};

export default InlineChatRoom;
