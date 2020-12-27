import { Schema, Document, model } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface UserDataInterface extends Document {
  _id: string;
  userId: string;
  fullName: string;
  aboutMe: string;
  rentLocation: string;
  age: number;
  gender: string;
  smoke: string;
  pet: boolean;
  relationship?: boolean;
  employed?: boolean;
  numOfRoomates?: number;
  religion?: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

const UserDataSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true
  },
  userId: {
    type: ObjectId,
    required: true
  },
  fullName: { type: String, required: true },
  aboutMe: { type: String, required: true },
  rentLocation: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  smoke: { type: String, required: true },
  pet: { type: Boolean, required: true },
  relationship: { type: Boolean },
  employed: { type: Boolean },
  numOfRoomates: Number,
  religion: Boolean,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date
});

UserDataSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default model<UserDataInterface>('UserData', UserDataSchema);
