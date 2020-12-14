require("dotenv").config();
import app from './app';

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
    // const token = socket.handshake.query.token;
    // const payload = await jwt.verify(token, process.env.SECRET);
    socket.userId = 1;
    next();
  } catch (err) {}
});

io.on("connection", (socket: any) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });
});
