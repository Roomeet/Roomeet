const mongoose = require("mongoose");
import Like, { LikeInterface } from '../models/Like';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { MatchInterface } from '../models/Match';


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

exports.handleLike = async (activeUserId: string, passiveUserId: string, liked: boolean): Promise<LikeInterface | null | undefined> => {
  try{
    // if like exist - changes it
    let like = await Like.findOneAndUpdate({ passiveUserId, activeUserId }, {liked: liked}, { new: true })
        // If like doesn't exist
        if (!like) {
          // Create it
          const newLike = new Like({
            _id: new ObjectId,
            activeUserId,
            passiveUserId,
            liked,
            createdAt: new Date(),
            updatedAt: null,
            deletedAt: null
          });
          like = await newLike.save();
        }
        // Save the document
      return like;
  } catch(error) {
    console.log(error)
  }
};

exports.checkMatchingLike = async (activeUserId: string, passiveUserId: string) => {
  try{ 
    //checks if the equivalent user is liking you to
    return await Like.findOne({activeUserId: passiveUserId, passiveUserId: activeUserId});
  } catch(error) {
    console.trace(error);
  }
};
