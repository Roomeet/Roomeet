import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
const router = Router();

//interfaces:

//mongoDB models:
const User = require('../../../models/user');
const UserData = require('../../../models/userData');

// Routes

// Get all users
router.get('/', /*authenticateToken ,*/ async (req: Request, res: Response) => {
  try {
    const users: any[] = await User.find({})
    res.json(users);    
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Get all users data form
router.get('/basic-info', /*authenticateToken ,*/ async (req: Request, res: Response) => {
  try {
    const usersData: any[] = await UserData.find({})
    res.json(usersData);
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
