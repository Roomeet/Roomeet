import app from './app';

app.get('/ping', function (req, res) {
  res.send('pong!');
});

const port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log(`Roomeet is listening on port ${port}!`);
});
