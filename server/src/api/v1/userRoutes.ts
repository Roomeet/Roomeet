import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

// interfaces:

// mongoDB models:
import User from '../../../models/user';
import UserData from '../../../models/UserData';
import Match from '../../../models/match';

const router = Router();

const crypto = require('crypto');
// const UserData = require('../../../models/userData');

// Routes

// Get all users
router.get(
  '/',
  /* authenticateToken , */ async (req: Request, res: Response) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

// Get all users data form
router.get(
  '/basic-info',
  /* authenticateToken , */ async (req: Request, res: Response) => {
    try {
      const usersData: any[] = await UserData.find({});
      res.json(usersData);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

// Get single user for client context
router.get(
  '/email/:email',
  /* authenticateToken , */ async (req: Request, res: Response) => {
    const { email } = req.params;

    try {
      const user = await User.find({ email });
      res.json({
        id: user[0].id,
        name: user[0].name,
        lastName: user[0].lastName,
        email: user[0].email
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

router.get(
  "/user-data/:id",
  /* authenticateToken , */ async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const userData = await UserData.find({userId: id });
      res.json({
        age: userData[0].age,
        gender: userData[0].gender,
        smoke: userData[0].smoke,
        pet: userData[0].pet,
        relationship: userData[0].relationship,
        employed: userData[0].employed,
        interests: userData[0].interests,
        languages: userData[0].languages,
        music: userData[0].music,
        lookingFor: userData[0].lookingFor ? { roomate:userData[0].lookingFor.roomate, friend: userData[0].lookingFor.friend } : null  ,
        numOfRoomates: userData[0].numOfRoomates,
        religion: userData[0].religion,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);



// Post user data
router.post('/user-data', (req: Request, res: Response) => {
  try {
    const { body: rawUserData } = req;

    const userData = new UserData({
      ...rawUserData,
      _id: new ObjectId(),
      userId: new ObjectId(rawUserData.userId),
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    });

    userData.save().then(() => res.status(201).json('Updated info!'));
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Match users
router.post(
  '/match', async (req: Request, res: Response) => {
    try {
      const { body: rawMatch } = req;
      const _id = crypto
        .createHash('md5')
        .update(rawMatch.userId + rawMatch.passiveUserId)
        .digest('hex').slice(0, 24);

      // @ts-ignore
      Match.findOneAndUpdate({ _id }, rawMatch, { new: true }, (error : any, result : any) => {
        if (!error) {
          // If the document doesn't exist
          if (!result) {
            // Create it
            result = new Match({
              ...rawMatch,
              _id: new ObjectId(_id),
              createdAt: new Date(),
              updatedAt: null,
              deletedAt: null
            });
          }
          // Save the document
          result.save((err:any) => {
            if (!err) {
              // Do something with the document
              res.json(rawMatch.like ? 'Matched' : 'Didnt match');
            } else {
              res.json({ error: err });
            }
          });
        }
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

export default router;
