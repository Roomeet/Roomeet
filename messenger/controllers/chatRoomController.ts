const mongoose = require("mongoose");
const ChatRoom = mongoose.model("ChatRoom");

exports.createChatRoom = async (req: Request | any, res: Response | any) => {
  try{
    const { name } = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;
  
    if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";
  
    const chatroomExists = await ChatRoom.findOne({ name });
  
    if (chatroomExists) throw "Chat room with that name already exists!";
  
    const chatroom = new ChatRoom({
      name,
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