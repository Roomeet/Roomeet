import app from './app';
import { ObjectId } from 'mongodb';
import Message from './models/Message';
import { MatchInterface } from './models/Match';
import { LikeInterface } from './models/Like';
import { userForMatch } from './models/User';
const matchControllers = require("./controllers/matchControllers");
const chatroomController = require("./controllers/chatroomControllers");
const notificationControllers = require("./controllers/notificationControllers");
const likeControllers = require("./controllers/likeControllers");
require("dotenv").config();

// mongoose connection:
const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("error", (err: { message: string; }) => {
  console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
});

//Bring in the models:
require("./models/User");
require("./models/Message");

const port = process.env.PORT || 3002;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const io = require("socket.io")(server);

io.use(async (socket: any, next: any) => {
  try {
    // @ts-ignore
    socket.userId = socket?.handshake.query.userId;
    next();
  } catch (err) {
    console.log(err)
  }
});

io.on("connect", (socket: any) => {
  // @ts-ignore
  console.log("Connected: " + socket?.userId);
  socket.join(socket?.userId);
  
  socket?.on("disconnect", (userId: string) => {
    // @ts-ignore
    console.log("Disconnected: " + socket?.userId);
  });
  
  
  socket?.on("EnteredRoom", ({ chatRoomId }: any ) => {
    socket.join(chatRoomId);
    console.log("A user joined chatroom: " + chatRoomId);
  });

  socket?.on("exitedRoom", ({ chatroomId }:  any) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });

  socket?.on("chatroomMessage", async ({ userId ,chatroomId, message }: any) => {
    if (message.trim().length > 0) {
      const newMessage = new Message({
        _id: new ObjectId,
        chatroom: chatroomId,
        userId: userId,
        message,
      });
      io.to(chatroomId).emit("newMessage", {
        message,
        userId,
      });
      await newMessage.save();
    }
  });

  socket?.on("like", async ({ passiveUser, activeUser, liked }: {passiveUser: userForMatch, activeUser: userForMatch, liked: boolean}, matchEmitter: (matchUsers: userForMatch[]) => void) => {
    try {
      const like: LikeInterface = await likeControllers.handleLike(activeUser.id, passiveUser.id, liked);
      if(like?.liked) {
        const matchingLikeExist = await likeControllers.checkMatchingLike(activeUser.id, passiveUser.id);
        if (matchingLikeExist) {
          await matchControllers.createMatch([activeUser.id, passiveUser.id])
          matchEmitter([passiveUser, activeUser])
        }
      }
    } catch (err) {
      console.log(err)
    }
  })
  
  socket?.on("match", async ({ matchUsers }: {matchUsers: userForMatch[]}) => {
    try {
      const activeUser = matchUsers[0];
      const passiveUser = matchUsers[1];
      await chatroomController.createChatRoom(matchUsers);
      await notificationControllers.createNotification(activeUser.id, 'match', 'you have a new match with' + passiveUser.id);
      await notificationControllers.createNotification(passiveUser.id, 'match', 'you have a new match with' + activeUser.id);
      io.to(activeUser.id).emit('match');
      io.to(passiveUser.id).emit('match');
    } catch (err) {
      console.log(err);
    }
  })

});
