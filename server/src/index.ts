/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { ObjectId } from 'mongodb';
import app from './app';
import Message from './models/Message';
import { LikeInterface } from './models/Like';
import { userForMatch } from './models/user';

const mongoose = require('mongoose');
const ioNoServer = require('socket.io');
const matchControllers = require('./controllers/matchControllers');
const chatroomController = require('./controllers/chatroomControllers');
const notificationControllers = require('./controllers/notificationControllers');
const likeControllers = require('./controllers/likeControllers');
require('dotenv').config();

// mongoose connection:
mongoose
  .connect(process.env.MONGODB_URI!, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log('connected to MongoDB!');
  })
  .catch((error: { message: any; }) => {
    console.log('error connecting to MongoDB:', error.message);
  });

mongoose.set('useCreateIndex', true);
// Bring in the models:
require('./models/user');
require('./models/Message');

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Roomeet is listening on port ${port}!`);
});

const io = ioNoServer(server);

io.use(async (socket: any, next: any) => {
  try {
    // @ts-ignore
    socket.userId = socket?.handshake.query.userId;
    next();
  } catch (err) {
    console.log(err);
  }
});

io.on('connect', (socket: any) => {
  // @ts-ignore
  console.log(`Connected: ${socket?.userId}`);
  socket.join(socket?.userId);

  socket?.on('disconnect', (userId: string) => {
    // @ts-ignore
    console.log(`Disconnected: ${socket?.userId}`);
  });

  socket?.on('EnteredRoom', ({ chatroomId }: any) => {
    socket.join(chatroomId);
    console.log(`A user joined chatroom: ${chatroomId}`);
  });

  socket?.on('exitedRoom', ({ chatroomId }: any) => {
    socket.leave(chatroomId);
    console.log(`A user left chatroom: ${chatroomId}`);
  });

  socket?.on('chatroomMessage', async ({ chatroomId, userId, message }: any) => {
    if (message.trim().length > 0) {
      const newMessage = new Message({
        _id: new ObjectId(),
        chatroom: chatroomId,
        userId,
        message
      });
      io.to(chatroomId).emit(`newMessage${chatroomId}`, {
        message,
        userId
      });
      await newMessage.save();
    }
  });

  socket?.on('like', async ({ passiveUser, activeUser, liked }: {passiveUser: userForMatch, activeUser: userForMatch, liked: boolean}, matchEmitter: (matchUsers: userForMatch[]) => void) => {
    try {
      console.log(liked);
      const like: LikeInterface = await likeControllers.handleLike(activeUser.id, passiveUser.id, liked);
      console.log(like);
      if (like?.liked) {
        const matchingLikeExist = await likeControllers.checkMatchingLike(activeUser.id, passiveUser.id);
        if (matchingLikeExist) {
          console.log('Like exist!!');
          await matchControllers.createMatch([activeUser.id, passiveUser.id]);
          matchEmitter([passiveUser, activeUser]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  });

  socket?.on('match', async (matchUsers : userForMatch[]) => {
    try {
      const activeUser = matchUsers[0];
      const passiveUser = matchUsers[1];
      await chatroomController.createChatRoom(matchUsers);
      await notificationControllers.createNotification(activeUser.id, 'match', `you have a new match with ${passiveUser.name}`);
      await notificationControllers.createNotification(passiveUser.id, 'match', `you have a new match with ${activeUser.name}`);
      io.emit(`matchNotification${activeUser.id}`);
      io.emit(`matchNotification${passiveUser.id}`);
    } catch (err) {
      console.log(err);
    }
  });
});
