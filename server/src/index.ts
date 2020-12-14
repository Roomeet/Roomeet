import app from './app';

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Roomeet is listening on port ${port}!`);
});

export const io = require('socket.io')(server);

io.on('connect', (socket: any) => {
  console.log('socket connected')
})

