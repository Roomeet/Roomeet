import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

const User = require('../../models/User');
const UserData = require('../../models/userData');
const router = Router();

// Routes
// Get all users
router.get('/', (req, res) => {
  try {
    User.find({}).then((users: any[]) => {
      res.json(users);
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Registers new user
router.post('/register', (req: Request, res: Response) => {
  try {
    const { body: userRegisterationData } = req;

    const user = new User({
      _id: new ObjectId(),
      ...userRegisterationData,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });

    user.save(user).then(() => res.status(201).send('Registerd!'));
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
      deletedAt: null,
    });

    userData.save(userData).then(() => res.status(201).json('Updated info!'));
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
