require("dotenv").config();
import app from './app';
import { ObjectId } from 'mongodb';
import Message from './models/Message';
import User from './models/User';
import { MatchInterface } from './models/Match';
import { Socket } from 'socket.io';
const matchControllers = require("./controllers/matchControllers");
const chatroomController = require("./controllers/chatroomController");
const notificationControllers = require("./controllers/chatroomController");

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

//Bring in the models
require("./models/User");
// require("./models/Chatroom");
require("./models/Message");

const port = process.env.PORT || 3002;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const io = require("socket.io")(server);

io.use(async (socket: any, next: any) => {
  try {
    // @ts-ignore
    const userId = socket?.handshake.query.userId;
    socket.userId = userId;
    next();
  } catch (err) {
    console.log(err)
  }
});

io.on("connect", (socket: any) => {
  // @ts-ignore
  console.log("Connected: " + socket?.userId);

  socket?.on("disconnect", (userId: string) => {
  // @ts-ignore
    console.log("Disconnected: " + socket?.userId);
  });

  socket?.on("EnteredRoom", ({ chatroomId }: any ) => {
    socket.join(chatroomId);
    console.log("A user joined chatroom: " + chatroomId);
  });

  socket?.on("exitedRoom", ({ chatroomId }:  any) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });

  socket?.on("chatroomMessage", async ({ userId ,chatroomId, message }: any) => {
    if (message.trim().length > 0) {
      const user = await User.findById(userId);
      const newMessage = new Message({
        _id: new ObjectId,
        chatroom: chatroomId,
        userId: userId,
        message,
      });
      io.to(chatroomId).emit("newMessage", {
        message,
        name: user?.name,
        userId: userId,
      });
      await newMessage.save();
    }
  });

  socket?.on("like", async ({ passiveUserId, activeUserId, liked }: {passiveUserId: string, activeUserId: string, liked: boolean}, matchEmitter: (match: MatchInterface) => void) => {
    try {
      const match: MatchInterface = await matchControllers.handleLike(activeUserId, passiveUserId, liked);
      matchEmitter(match)
    } catch (err) {
      console.log(err)
    }
  })
  
  socket?.on("match", async ({ match }: {match: MatchInterface}) => {
    try {
      const { users } = match
      await chatroomController.createChatRoom(users, 'chatroomName');
      users.forEach(async (user) => {
        await notificationControllers.createNotification(user, 'match', 'you have a new match with' + user);
      });
    } catch (err) {
      console.log(err);
    }
  })

});
