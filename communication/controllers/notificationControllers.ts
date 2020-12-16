const mongoose = require("mongoose");
import { ObjectId } from 'mongodb';
import Notification, { NotificationInterface } from '../models/Notification';
import Like from '../models/Like';

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

exports.getAllNotificationsByUserId = async (userId: string): Promise<NotificationInterface[] | undefined> => {
  try {
    const notifications = await Notification.find({userId});
    return notifications
  } catch (error) {
    console.log(error)
  }
}