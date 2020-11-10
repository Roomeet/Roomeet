import express from 'express';
// Create a new express app instance
var app = express();
app.get('/ping', function (req, res) {
    res.send('pong!');
});
app.listen(3001, function () {
    console.log('App is listening on port 3000!');
});
