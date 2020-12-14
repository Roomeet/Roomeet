import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from 'helpers/authenticate';
import { ObjectId } from 'mongodb';

// interfaces:

// mongoDB models:
// import ChatRoom from '../../../models/ChatRoom';
import Message from '../../../models/Message';

const router = Router();

helpers:
const createChatroom = async (req: Request, res: Response) => {
  try{
    const name: string = req.body.name;
    const participants: string[] = req.body.participants;

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";

    const chatRoomExists = await ChatRoom.findOne({ name });

    if (chatRoomExists) throw "Chatroom with that name already exists!";

    const chatRoom = new ChatRoom({
      name,
      participants
    });

    await chatRoom.save();

    res.json({
      message: "Chatroom created!",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

Routes

Create new chatroom
router.post('/', createChatroom);

Get all users
router.get(
  '/',
  /* authenticateToken , */ async (req: Request, res: Response) => {
    try {
      const chatrooms = await ChatRoom.find({});
      res.json(chatrooms);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

router.get(
  '/test',
  /* authenticateToken , */ async (req: Request, res: Response) => {
    try {
      res.send('route is')
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

// export default router;

module.exports = function(io: any) {
  return router;
}
