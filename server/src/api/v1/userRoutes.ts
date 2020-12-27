/* eslint-disable no-console */
import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Match from '../../models/Match';
import Like from '../../models/Like';

// mongoDB models:
import User from '../../models/user';
import UserData, { UserDataInterface } from '../../models/UserData';

const { readFileSync } = require('fs');
const path = require('path');

const router = Router();

const crypto = require('crypto');
// const UserData = require('../../../models/userData');

// Routes

// Get all users
router.get(
  '/',
  /* authenticateToken , */ async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      const users = await User.find(id ? { _id: String(id) } : {});
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
      const { id } = req.query;

      const usersData: any[] = await UserData.find(
        id ? { userId: String(id) } : {}
      );

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
  '/user-data/:id',
  /* authenticateToken , */ async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const userData = await UserData.find({ userId: id });
      res.json(userData);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

// update user data form
router.post('/user-data/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { body: rawUserData } = req;
    const userData = new UserData({
      ...rawUserData
    });
    await UserData.findOneAndUpdate(
      { userId: id },
      userData,
      { new: true },
      (error: any, result: any) => {
        if (!error) {
          // If the document doesn't exist
          if (!result) {
            // Create it
            result = new UserData({
              ...rawUserData,
              _id: new ObjectId(),
              userId: new ObjectId(rawUserData.userId),
              createdAt: new Date(),
              updatedAt: null,
              deletedAt: null
            });
            // Save the document
            result.save((err: any) => {
              if (!err) {
                // Do something with the document
                res.status(200).send('user form created');
              } else {
                res.json({ error: err });
              }
            });
          } else {
            res.status(200).send('user form updated');
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Match users
router.post('/match', async (req: Request, res: Response) => {
  try {
    const { body: rawMatch } = req;
    const _id = crypto
      .createHash('md5')
      .update(rawMatch.userId + rawMatch.passiveUserId)
      .digest('hex')
      .slice(0, 24);

    // @ts-ignore
    Match.findOneAndUpdate(
      { _id },
      rawMatch,
      { new: true },
      (error: any, result: any) => {
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
          result.save((err: any) => {
            if (!err) {
              // Do something with the document
              res.json(rawMatch.like ? 'Matched' : 'Unmatched');
            } else {
              res.json({ error: err });
            }
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/match-all', async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    // @ts-ignore
    const matches = await Match.find({ userId });
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/delete', async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    await User.deleteMany({});
    res.status(200).json('deleted');
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/userData/delete', async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    await UserData.deleteMany({});
    res.status(200).json('deleted');
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/all-cards', async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { userId }: { userId: string } = req.query;
    const likes = await Like.find({ activeUserId: userId });
    const usersLike: string[] = likes.map((like) => like.passiveUserId);
    const allcards: UserDataInterface[] = await UserData.find({
      userId: {
        $nin: [...usersLike, userId]
      }
    });
    res.status(200).json(allcards);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// get all cities
router.get('/cities', async (req, res) => {
  try {
    const data = readFileSync(path.resolve(__dirname, './backup.json'));
    const dataJson = JSON.parse(data);
    res.send(dataJson.Sheet1);
  } catch (error) {
    console.log(error);

    res.status(500).send({ message: error.message });
  }
});

export default router;
