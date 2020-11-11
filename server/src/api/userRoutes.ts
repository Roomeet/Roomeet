import { Router, Request, Response } from 'express';
import { ObjectID } from 'mongodb';

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
router.post('/', (req: Request, res: Response) => {
  try {
    const { name, lastName, password, email } = req.body;

    const user = new User({
      _id: new ObjectID(),
      name,
      lastName,
      password,
      email,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });

    user.save(user).then(() => res.status(201).json(user));
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
