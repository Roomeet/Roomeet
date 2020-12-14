require("dotenv").config();
import app from './app';
import { ObjectId } from 'mongodb';
import Message from './models/Message';
import User from './models/User';

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
require("./models/Chatroom");
require("./models/Message");

const port = process.env.PORT || 3002;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const io = require("socket.io")(server);

io.use(async (socket: any, next: any) => {
  try {
    const userId = socket.handshake.query.userId;
    // const payload = await jwt.verify(token, process.env.SECRET);
    socket.userId = userId;
    next();
  } catch (err) {}
});

io.on("connection", (socket: any) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  socket.on("EnteredRoom", ({ chatroomId }: any ) => {
    socket.join(chatroomId);
    console.log("A user joined chatroom: " + chatroomId);
  });

  socket.on("exitedRoom", ({ chatroomId }:  any) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });

  socket.on("chatroomMessage", async ({ chatroomId, message }: any) => {
    if (message.trim().length > 0) {
      const user = await User.findById(socket.userId);
      const newMessage = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        message,
      });
      io.to(chatroomId).emit("newMessage", {
        message,
        name: user?.name,
        userId: socket.userId,
      });
      await newMessage.save();
    }
  });

});
