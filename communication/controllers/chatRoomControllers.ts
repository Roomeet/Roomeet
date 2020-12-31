import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import ChatRoom from '../models/ChatRoom';
import Message from '../models/Message';
import { userForMatch } from '../models/User';

exports.createChatRoom = async (participants: userForMatch[], name: string = "") => {
  try{
    const activeUser = participants[0];
    const passiveUser = participants[1];
    const chatRoomName: string = !name ? `${activeUser.name},${passiveUser.name}` : name
  
    const chatroomExists = await ChatRoom.findOne({ chatRoomName });
  
    if (chatroomExists) throw "Chat room with that name already exists!";
  
    const chatroom = new ChatRoom({
      _id: new ObjectId,
      name: chatRoomName,
      participants: [activeUser.id, passiveUser.id],
    });
  
    return await chatroom.save();
  } catch(error) {
    console.log(error)
  }
};

exports.getAllchatRoomsByUserId = async (req: Request | any, res: Response) => {
  try {
    const chatRooms = await ChatRoom.find({participants: req.params.userId});
    res.json(chatRooms)
  } catch(error) {
    res.json(error)
  }
};

exports.getAllChatRooms = async (req: Request | any, res: Response) => {
  try {
    const chatRooms = await ChatRoom.find({});
    res.json(chatRooms);
  } catch(error) {
    res.json({ error })
  }
};

exports.deleteAllChatrooms = async (req: Request, res: Response) => {
  try {
    await ChatRoom.deleteMany({});
    res.json('delete');
  } catch(error) {
    res.json({ error })
  }
};

exports.deleteAllMessages = async (req: Request, res: Response) => {
  try {
    await Message.deleteMany({});
    res.json('delete');
  } catch(error) {
    res.json({ error })
  }
};

exports.getAllMessagesforChatRoomById = async (req: Request | any, res: Response) => {
  try {
    const messages = await Message.find({chatroom: req.params.chatroomId});
    res.json(messages)
  } catch(error) {
    res.json(error)
  }
};

exports.getLastMessageforChatRoomById = async (req: Request | any, res: Response) => {
  try{
    const messages = await Message.find({chatroom: req.params.chatroomId});
    res.json(messages[messages.length - 1]);
  } catch(error) {
    res.status(500).json({ error })
  }
}

