import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

// interfaces:

// mongoDB models:
import User from '../../../models/user';

const router = Router();

const UserData = require('../../../models/userData');

// Routes

// Get all users
router.get('/', /* authenticateToken , */ async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Get single user for client context
router.get('/email/:email', /* authenticateToken , */ async (req: Request, res: Response) => {
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
});

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

    userData.save(userData).then(() => res.status(201).json('Updated info!'));
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
