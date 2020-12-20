import express, { Request, Response, NextFunction } from 'express';
import api from './api/index'

var cors = require('cors')
const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

app.use('*', (req:Request, res:Response) => {
  res.sendStatus(404);
});


export default app;
