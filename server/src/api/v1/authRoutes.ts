import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';

// interfaces & mongoDB models:
import User, { UserInterface } from '../../../models/user';
import RefreshToken, {
  RefreshTokenInterface
} from '../../../models/refreshToken';
import { authenticateToken } from '../../helpers/authenticate';

const router = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// types:
type InfoForCookie = {
  userId: string | undefined;
  email: string;
};

// helpers:
const userIsExist = async (email: string): Promise<UserInterface | null> => {
  const user: UserInterface | null = await User.findOne({ email }).exec();
  return user;
};

const generateToken = (userInfo: InfoForCookie) => jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '900s' });

// validateToken
router.get(
  '/validateToken',
  authenticateToken,
  (req: Request, res: Response) => {
    res.send(true);
  }
);

// get new access token
router.post('/token', async (req, res) => {
  const refreshToken = req.body.token;
  const validRefreshToken = await RefreshToken.findOne({ token: refreshToken });
  if (!validRefreshToken) {
    return res.status(403).json({ message: 'Invalid Refresh Token' });
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err: Error, decoded: any) => {
      if (err) { return res.status(403).json({ message: 'Invalid Refresh Token' }); }
      delete decoded.iat;
      delete decoded.exp;
      const updatedAccessToken = generateToken(decoded);
      res.cookie('accessToken', updatedAccessToken);
      res.json({ message: 'token updated' });
    }
  );
});

// Registers new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { body: userRegisterationData } = req;

    userRegisterationData.password = await bcrypt.hash(
      userRegisterationData.password,
      10
    );

    const newUser = new User({
      _id: new ObjectId(),
      name: userRegisterationData.name,
      lastName: userRegisterationData.lastName,
      password: userRegisterationData.password,
      email: userRegisterationData.email,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    });

    newUser.save().then(() => res.status(201).send('Registerd!'));
  } catch (error) {
    res.status(500).json({ error });
  }
});

// login
router.post('/login', async (req: Request, res: Response) => {
  const loginData = req.body;
  const user = await userIsExist(loginData.email);

  if (!user) {
    return res.status(404).send('cannot find user');
  }
  try {
    await bcrypt.compare(
      loginData.password,
      user.password,
      (err: Error, result: boolean) => {
        if (err) {
          res.status(403).send(err);
        } else if (!result) {
          res.status(403).send('User or Password incorrect');
        }
      }
    );

    const expiresIn = loginData.rememberMe ? '365 days' : '24h';
    const infoForCookie: InfoForCookie = {
      userId: user.id,
      email: user.email
    };

    // assigning new refresh token
    const refreshToken = jwt.sign(
      infoForCookie,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn }
    );

    // checking if the user already have a token, and if does updates it.
    const existingRefreshToken: RefreshTokenInterface | null = await RefreshToken.findOneAndUpdate(
      { email: loginData.email },
      { token: refreshToken }
    );

    // if user dosent have a token, creates one.
    if (!existingRefreshToken) {
      const newRefreshToken = new RefreshToken({
        _id: new ObjectId(),
        email: user.email,
        token: refreshToken,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null
      });
      newRefreshToken.save();
    }

    const accessToken = await generateToken(infoForCookie);
    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);
    res.cookie('email', user.email);
    res.cookie('id', user.id);
    res.status(200).send({ accessToken, email: user.email, id: user.id });
  } catch (error) {
    res.status(403).send();
  }
});

export default router;
