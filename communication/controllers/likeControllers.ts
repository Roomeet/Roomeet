const mongoose = require("mongoose");
import Like from '../models/Like';
import { Request, Response } from 'express';

exports.getAllLikes = async (req: Request, res: Response) => {
  try {
    const likes = await Like.find({});
    res.json(likes);
  } catch(error) {
    res.json({ error })
  }
};

exports.deleteAllLikes = async (req: Request, res: Response) => {
  try {
    await Like.deleteMany({});
    res.json('delete');
  } catch(error) {
    res.json({ error })
  }
};
