const mongoose = require("mongoose");
import { ObjectId } from 'mongodb';
import Match, { MatchInterface } from '../models/Match';
import Like from '../models/Like';
import { Request, Response } from 'express';

const checkMatchingLike = async (activeUserId: string, passiveUserId: string) => {
  try{ 
    //checks if the equivalent user is liking you to
    return await Like.findOne({activeUserId: passiveUserId, passiveUserId: activeUserId});
  } catch(error) {
    console.trace(error);
  }
};

const createMatch = async (users: string[]) => {
  try{  
    const matchExists = await Match.findOne({ users });
  
    if (matchExists) throw "Match for those users already exists!";
  
    const match = new Match({
      _id: new ObjectId,
      users,
    });
  
    return await match.save();

  } catch(error) {
    console.log(error)
  }
};

exports.handleLike = async (activeUserId: string, passiveUserId: string, liked: boolean): Promise<MatchInterface | undefined> => {
  try{
    // if like exist - changes it
    await Like.findOneAndUpdate({ passiveUserId, activeUserId }, {liked: liked}, { new: true }, (error : any, result : any) => {
      if (!error) {
        // If like doesn't exist
        if (!result) {
          // Create it
          result = new Like({
            _id: new ObjectId,
            activeUserId,
            passiveUserId,
            liked,
            createdAt: new Date(),
            updatedAt: null,
            deletedAt: null
          });
        }
        // Save the document
        result.save();
      }
    });

    let match: MatchInterface | undefined;

    if(liked) {
      const matchingLikeExist = await checkMatchingLike(activeUserId, passiveUserId);
      if (matchingLikeExist) {
        match = await createMatch([activeUserId, passiveUserId])
      }
    }
    return match
  } catch(error) {
    console.log(error)
  }
};

exports.cancelMatch = async (req: Request, res: Response) => {
  try{
    const { users } = req.body;  
  
    const updatedMatch = await Match.findOneAndUpdate({ users }, { cancel: true });
      
    res.json({
      message: "match created!",
      updatedMatch,
    });
  } catch(error) {
    res.json({ error })
  }
};

exports.getAllMatches = async (req: Request, res: Response) => {
  try {
    const matches = await Match.find({});
    res.json(matches);
  } catch(error) {
    res.json({ error })
  }
};

exports.getAllMatchesByUserId = async (req: Request, res: Response) => {
  try {
    const matches = await Match.find({users: req.params.userId});
    res.json({matches})
  } catch(error) {
    res.json(error)
  }
};

exports.deleteAllMatches = async (req: Request, res: Response) => {
  try {
    await Match.deleteMany({});
    res.json('delete');
  } catch(error) {
    res.json({ error })
  }
};