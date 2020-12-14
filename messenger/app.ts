import express, { Request, Response, NextFunction } from 'express';
var cors = require('cors')
const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


export default app;
