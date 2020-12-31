import { Schema, Document, model } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface Message extends Document {
  _id: string;
  chatroom: ObjectId;
  user: ObjectId;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const messageSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  chatroom: {
    type: ObjectId,
    required: true,
    ref: "ChatRoom",
  },
  userId: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
});

// ???
messageSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<Message>('Message', messageSchema);
