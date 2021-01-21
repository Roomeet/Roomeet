/* eslint-disable max-len */
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Notification, { NotificationInterface } from '../models/Notification';

exports.createNotification = async (userId: string, topic: string, content: string): Promise<NotificationInterface | undefined> => {
  try {
    const notification = new Notification({
      _id: new ObjectId(),
      userId,
      topic,
      content
    });
    return await notification.save();
  } catch (error) {
    console.log(error);
  }
};

exports.getAllNotificationsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId });
    res.json(notifications);
  } catch (error) {
    res.json(error);
  }
};

exports.getAllNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find({});
    res.json(notifications);
  } catch (error) {
    res.json({ error });
  }
};

exports.deleteAllNotifications = async (req: Request, res: Response) => {
  try {
    await Notification.deleteMany({});
    res.json('delete');
  } catch (error) {
    res.json({ error });
  }
};

exports.seeNotification = async (req: Request, res: Response) => {
  try {
    const { notificationId: id } = req.params;
    const notificationUpdated = await Notification.findByIdAndUpdate(id, { seen: true }, { new: true });
    res.send({ notificationUpdated });
  } catch (error) {
    console.log(error);
  }
};
