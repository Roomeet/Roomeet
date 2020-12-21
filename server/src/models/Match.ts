import { Schema, Document, model } from 'mongoose';
import { ObjectID } from 'mongodb';

export interface LikeInterface extends Document {
  _id: string;
  liked: boolean;
  activeUserId: string;
  passiveUserId: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

const likeSchema = new Schema({
  _id: {
    type: ObjectID,
    required: true
  },
  liked: {
    type: Boolean,
    required: true
  },
  activeUserId: {
    type: String,
    required: true
  },
  passiveUserId: {
    type: String,
    required: true
  },
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date
});

likeSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default model<LikeInterface>('Like', likeSchema);
