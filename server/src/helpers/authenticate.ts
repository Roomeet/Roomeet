import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Or undefiend or the access token
  if (token == null) return res.status(401).send('Access Token Required');
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: string, decoded: any) => {
    if (err) {
      return res.status(408).send('Invalid Access Token'); // you got a token but this is no longer valid
    }
    req.body.user = decoded;
    next();
  });
};
