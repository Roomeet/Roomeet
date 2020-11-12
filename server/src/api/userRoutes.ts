import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { RefreshTokenInterface, UserInterface } from '../../models';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import { authenticateToken } from "../helpers/authenticate";

const router = Router();
const {UserConnection, UserInterface, UserData, RefreshToken} = require('../../models');
const { User } = require('../../models/User');

type InfoForCookie =  {
  userId: string,
  email: string,
}

// Routes
// Get all users
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const users: any[] = User.find({})
      res.json(users);
    
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Registers new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    let { body: userRegisterationData } = req;
    console.log(userRegisterationData);
    
    userRegisterationData.password = await bcrypt.hash(userRegisterationData.password, 10);
    console.log(userRegisterationData.password)
    const user = new User({
      _id: new ObjectId(),
      ...userRegisterationData,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });
    console.log('USER -------' + user);
    
    User.save(user).then((res : any) => res.status(201).send('Registerd!'));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//login
router.post("/login", async (req: Request, res: Response) => {
  const loginData = req.body

  const user = await userIsExist(loginData.email);

  if(!user) {
    return res.status(404).send("cannot find user")
  }
  try {
    if(!await bcrypt.compare(loginData.password, user.password)){
      res.status(403).send("User or Password incorrect"); 
    }      

    const expiresIn = loginData.rememberMe ? "365 days" : "24h";
    const infoForCookie: InfoForCookie = {
      userId: user.id,
      email: user.email,
    };

    const newRefreshToken = jwt.sign(
      infoForCookie,
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: expiresIn}
    )

    const existingRefreshToken:RefreshTokenInterface = await RefreshToken.findOneAndUpdate(
      {email: loginData.email},
      {token: newRefreshToken}
    )

    if(!existingRefreshToken) {
      RefreshToken.save(newRefreshToken);
    }

    const accessToken = await generateToken(infoForCookie);

    res.status(200).send({accessToken : accessToken, email: user.email});   
} catch (error) {
  res.status(403).send();
}
})

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

const userIsExist = async (email:string):Promise<UserInterface> => {
  const user:UserInterface = await User.find({email: email}).exec()

  return user;
}

const tokenIsExist = async (email:string):Promise<RefreshTokenInterface> => {
  const refreshToken:RefreshTokenInterface = await RefreshToken.find({email: email}).exec()

  return refreshToken;
}

const generateToken = (userInfo: InfoForCookie) => {
  return jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "900s" });
}



export default router;
