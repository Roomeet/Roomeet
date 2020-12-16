const mongoose = require("mongoose");
import { ObjectId } from 'mongodb';
import Notification, { NotificationInterface } from '../models/Notification';
import Like from '../models/Like';

const checkMatchingLike = async (activeUserId: string, passiveUserId: string) => {
  try{ 
    //checks if the equivalent user is liking you to
    const likeExist = await Like.findOne({activeUser: passiveUserId, passiveUser: activeUserId});

    return likeExist

  } catch(error) {
    console.log(error);
  }
};

exports.createNotification = async (userId: string, topic: string, content: string): Promise<NotificationInterface | undefined> => {
  try {
    const notification = new Notification({
      userId,
      topic,
      content,
    })
    
    return await notification.save();
  } catch (error) {
    console.log(error)
  }
};