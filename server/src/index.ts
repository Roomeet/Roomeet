import app from './app';

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Roomeet is listening on port ${port}!`);
});

// const server = chatApp.listen(8080, () => {
//   console.log("chat server is listening on port 8080");
// });

// export const io = require('socket.io')(server);

// io.on('connect', (socket: any) => {
//   console.log('socket connected');
// });
