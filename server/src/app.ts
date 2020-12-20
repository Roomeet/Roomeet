import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const cors = require('cors');

require('dotenv').config();

const URI = process.env.MONGODB_URI;

const app: express.Application = express();

let requestID = 0;
function logger(req: Request, res: Response, next: NextFunction) {
  console.log(
    `Request #${requestID}\nRequest fired: ${req.url}\nMethod: ${req.method}`
  );
  requestID += 1;
  next();
}

app.use(logger);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('./build/'));
app.use(express.json());

mongoose
  .connect(URI!, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB!');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

mongoose.set('useCreateIndex', true);

app.use('/api', require('./api/index.ts'));

app.use('*', (req, res) => {
  res.sendStatus(404);
});

export default app;
