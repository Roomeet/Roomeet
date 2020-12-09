import { Schema, Document, model } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface UserDataInterface extends Document {
  _id: string;
  userId: string;
  age: number;
  gender: string;
  smoke: boolean;
  pet: boolean;
  relationship?: boolean;
  employed?: boolean;
  interests: string[];
  languages: string[];
  music: string[];
  lookingFor?: { roomate: boolean; friend: boolean };
  numOfRoomates?: number;
  religion?: string;
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
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  smoke: { type: Boolean, required: true },
  pet: { type: Boolean, required: true },
  relationship: { type: Boolean },
  employed: { type: Boolean },
  interests: [String],
  languages: [String],
  music: [String],
  lookingFor: { type: Schema.Types.Mixed },
  numOfRoomates: Number,
  religion: String,
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

module.exports = model<UserDataInterface>('UserData', UserDataSchema);
