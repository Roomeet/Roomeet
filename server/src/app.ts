import express, { Request, Response, NextFunction } from 'express';

const cors = require('cors');
require('dotenv').config();

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

app.set('view engine', 'ejs');

// mongoose
//   .connect(URI!, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
//   .then(() => {
//     console.log('connected to MongoDB!');
//   })
//   .catch((error) => {
//     console.log('error connecting to MongoDB:', error.message);
//   });

// mongoose.set('useCreateIndex', true);

app.use('/api', require('./api/index.ts'));

app.use('*', (req:Request, res:Response) => {
  res.sendStatus(404);
});

export default app;
