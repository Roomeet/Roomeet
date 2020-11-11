import express from 'express';

const app: express.Application = express();
app.get('/ping', (req, res) => {
  res.send('pong!');
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
