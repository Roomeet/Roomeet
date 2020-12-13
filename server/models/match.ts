import { Schema, Document, model } from 'mongoose';
import { ObjectID } from 'mongodb';

export interface MatchInteface extends Document {
  _id: string;
  like: boolean;
  userId: string;
  passiveUserId: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

const matchSchema = new Schema({
  _id: {
    type: ObjectID,
    required: true
  },
  like: {
    type: Boolean,
    required: true
  },
  userId: {
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

matchSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default model<MatchInteface>('Match', matchSchema);
