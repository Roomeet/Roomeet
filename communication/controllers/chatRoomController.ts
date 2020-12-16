const mongoose = require("mongoose");
import ChatRoom from '../models/ChatRoom';

exports.createChatRoom = async (req: Request | any, res: Response | any) => {
  try{
    const { body } = req;
    const participants: string[] = body.participants;
    const name: string = participants.length === 2 ? `${participants[0]}&${participants[1]}` : body.name

    const nameRegex = /^[A-Za-z\s]+$/;
  
    if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";
  
    const chatroomExists = await ChatRoom.findOne({ name });
  
    if (chatroomExists) throw "Chat room with that name already exists!";
  
    const chatroom = new ChatRoom({
      name,
      participants
    });
  
    await chatroom.save();
  
    res.json({
      message: "ChatRoom created!",
    });
  } catch(error) {
    res.json({ error })
  }
};

exports.getAllChatRooms = async (req: Request | any, res: Response | any) => {
  try {
    const chatRooms = await ChatRoom.find({});
    res.json(chatRooms);
  } catch(error) {
    res.json({ error })
  }
};