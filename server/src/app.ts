import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

require('dotenv').config();

const URI = process.env.MONGODB_URI;

const app: express.Application = express();

app.use(logger);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose
  .connect(URI!, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB!');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

let requestID = 0;
function logger(req: Request, res: Response, next: NextFunction) {
  console.log(
    `Request #${requestID}\nRequest fired: ${req.url}\nMethod: ${req.method}`
  );
  requestID += 1;
  next();
};


app.use('/api', require('./api'));

app.use('*', function(req,res){
  res.sendStatus(404)
})


export default app;
