import { Schema, Document, model, SchemaType } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface NotificationInterface extends Document {
  _id: string;
  userId: string;
  topic: string;
  content: string;
  seen: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const notificationSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  userId: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  topic: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  seen: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
});

// ???
notificationSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<NotificationInterface>('Notification', notificationSchema);
