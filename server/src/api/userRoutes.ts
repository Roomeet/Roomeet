import { Router, Request, Response } from 'express';
import { ObjectID } from 'mongodb';
const User = require('../../models/User');
const UserData = require('../../models/userData');

const router = Router();

// Routes
// Get all users
router.get('/', (req, res) => {
  User.find({}).then((users: any[]) => {
    res.json(users);
  });
});

// Registers new user
router.post('/', (req: Request, res: Response) => {
  const { name, lastName, password, email } = req.body;
  const date = new Date();

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
});

export default router;

//   User.findOne({ $or: [{ userName }, { email }] }).then((result) =>
//     result
//       ? res.status(400).json({ error: 'Email or username already in use' })
//       : user.save(user).then(() => res.status(201).json('Registered!'))
//   );
