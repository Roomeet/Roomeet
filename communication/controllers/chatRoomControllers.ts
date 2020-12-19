const mongoose = require("mongoose");
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import ChatRoom from '../models/ChatRoom';
import Message from '../models/Message';

exports.createChatRoom = async (participants: string[], name: string = "") => {
  try{
    const chatRoomName: string = !name ? `${participants[0]}${participants[1]}` : name

    const nameRegex = /^[A-Za-z\s]+$/;
  
    if (!nameRegex.test(chatRoomName)) throw "Chatroom name can contain only alphabets.";
  
    const chatroomExists = await ChatRoom.findOne({ chatRoomName });
  
    if (chatroomExists) throw "Chat room with that name already exists!";
  
    const chatroom = new ChatRoom({
      _id: new ObjectId,
      name: chatRoomName,
      participants
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
