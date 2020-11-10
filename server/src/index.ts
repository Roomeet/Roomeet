import express from 'express';
// Create a new express app instance
const app: express.Application = express();
app.get('/ping', function (req, res) {
res.send('pong!');
});
const port = process.env.PORT || 3001
app.listen(port, function () {
console.log(`App is listening on port ${port}!`);
});
