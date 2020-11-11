import { Schema, Document, model } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface UserData extends Document {
  _id: string;
  userId: string;
  age: number;
  gender: string;
  smoke: boolean;
  pet: boolean;
  relationship: boolean;
  employed: boolean;
  interests: string[];
  languages: string[];
  music: string[];
  lookingFor: { roomate: boolean; friend: boolean };
  numOfRoomates: number;
  religion: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const UserDataSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  ages: { type: Schema.Types.Mixed },
  gender: { type: Schema.Types.Mixed },
  smoke: Boolean,
  pet: Boolean,
  relationship: Boolean,
  employed: Boolean,
  interests: [String],
  languages: [String],
  music: [String],
  lookingFor: { type: Schema.Types.Mixed },
  numOfRoomates: Number,
  religion: String,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
});

UserDataSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = model<UserData>('UserData', UserDataSchema);
