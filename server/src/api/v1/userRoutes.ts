/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-console */
import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Match from '../../models/Match';
import Like from '../../models/Like';
import getDistance from '../../helpers/getDistance';

// mongoDB models:
import User from '../../models/user';
import UserData, { UserDataInterface, filterInterface } from '../../models/UserData';

const { readFileSync } = require('fs');
const path = require('path');

const router = Router();

const crypto = require('crypto');
const multer = require('multer');

const upload = multer();

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
router.get(
  '/basic-info/picture',
  /* authenticateToken , */ async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      const usersData: any[] = await UserData.find(
        { userId: String(id) }
      );

      res.json(usersData[0].image);
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
  console.log(req.body);
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
    const userData: UserDataInterface[] = await UserData.find({ userId });
    const likes = await Like.find({ activeUserId: userId });
    const usersLike: string[] = likes.map((like :any) => like.passiveUserId);
    const allcards: UserDataInterface[] = await UserData.find({
      userId: {
        $nin: [...usersLike, userId]
      }
    });
    const sortedCards: UserDataInterface[] = allcards.filter((card :UserDataInterface) => {
      const distance: number = getDistance(card.rentLocation.coordinates, userData[0].rentLocation.coordinates);
      return distance < 10000;
    });
    res.status(200).json(sortedCards);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post('/all-cards/filtered', async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const filters: filterInterface = req.body;
    const { userId } = filters;
    // eslint-disable-next-line
    const userData: UserDataInterface[] = await UserData.find({ userId }); // eslint-disable-line
    const likes = await Like.find({ activeUserId: filters.userId });
    const usersLike: string[] = likes.map((like :any) => like.passiveUserId);
    let allcards: UserDataInterface[] = await UserData.find({
      userId: {
        $nin: [...usersLike, filters.userId]
      },
      age: {
        $gt: filters.ageRange[0] - 1,
        $lt: filters.ageRange[1] + 1
      },
      // keep it untill all users have budget.
      $or: [
        {
          maxBudget: {
            $gt: filters.budgetRange[0] - 1,
            $lt: filters.budgetRange[1] + 1
          }
        },
        {
          minBudget: {
            $gt: filters.budgetRange[0] - 1,
            $lt: filters.budgetRange[1] + 1
          }
        }
      ]
    });
    // @ts-ignore
    delete filters.ageRange;
    // @ts-ignore
    delete filters.budgetRange;
    allcards = allcards.filter((card :UserDataInterface) => {
      const distance: number = getDistance(card.rentLocation.coordinates, userData[0].rentLocation.coordinates);
      return distance < 10000;
    });
    if (filters.gender) {
      allcards = allcards.filter((person) => person.gender === filters.gender);
    }
    if (filters.pet) {
      allcards = allcards.filter((person) => person.pet === false);
    }
    if (filters.relationship) {
      allcards = allcards.filter((person) => person.relationship === false);
    }
    if (filters.religion) {
      allcards = allcards.filter((person) => person.religion === true);
    }
    if (filters.employed) {
      allcards = allcards.filter((person) => person.employed === true);
    }
    if (filters.smoke) {
      allcards = allcards.filter((person) => person.smoke !== 'Allways');
    }
    res.status(200).json(allcards);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post('/user-data/profile/picture/:userId', upload.single('file'), async (req: any, res: Response) => {
  try {
    const { userId } = req.params;
    const { buffer: image } = req.file;

    const userData = await UserData.findOneAndUpdate({ userId }, { image }, { new: true });
    res.status(200).json(userData);
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
    res.status(500).send({ message: error.message });
  }
});

export default router;
