const mongoose = require("mongoose");
import Notification from '../models/Notification';
import { Request, Response } from 'express';
import { NotificationInterface } from '../models/Notification';
import { ObjectId } from 'mongodb';

exports.createNotification = async (userId: string, topic: string, content: string): Promise<NotificationInterface | undefined> => {
  try {
    const notification = new Notification({
      _id: new ObjectId,
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

exports.getAllNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find({});
    res.json(notifications);
  } catch(error) {
    res.json({ error })
  }
};

exports.notificationControllers = async (req: Request, res: Response) => {
  try {
    await Notification.deleteMany({});
    res.json('delete');
  } catch(error) {
    res.json({ error })
  }
};
