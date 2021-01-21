import { Schema, Document, model } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface ChatRoom extends Document {
  _id: string;
  name: string;
  participants: [String];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const ChatRoomSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  participants: {
    type: [String],
    required: true
  },
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
});

// ???
ChatRoomSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<ChatRoom>('ChatRoom', ChatRoomSchema);
