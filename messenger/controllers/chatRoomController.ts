const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");

exports.createChatroom = async (req: Request | any, res: Response | any) => {
  try{
    const { name } = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;
  
    if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";
  
    const chatroomExists = await Chatroom.findOne({ name });
  
    if (chatroomExists) throw "Chatroom with that name already exists!";
  
    const chatroom = new Chatroom({
      name,
    });
  
    await chatroom.save();
  
    res.json({
      message: "Chatroom created!",
    });
  } catch(error) {
    res.json({ error })
  }
};

exports.getAllChatrooms = async (req: Request | any, res: Response | any) => {
  try {
    const chatrooms = await Chatroom.find({});
    res.json(chatrooms);
  } catch(error) {
    res.json({ error })
  }
};