import { Schema, Document, model } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface filterInterface {
  userId: string
  gender?: string;
  smoke?: boolean;
  pet?: boolean;
  relationship?: boolean;
  religion?: boolean;
  employed?: boolean;
  budgetRange: number[];
  ageRange: number[];
}
export interface UserDataInterface extends Document {
  _id: string;
  userId: string;
  image: Buffer,
  fullName: string;
  aboutMe: string;
  rentLocation: string;
  age: number;
  gender: string;
  smoke: string;
  budgetRange: number[];
  pet: boolean;
  relationship?: boolean;
  employed?: boolean;
  numOfRoomates?: number;
  religion?: boolean;
  cities?: JSON;
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
  image: Buffer,
  fullName: { type: String, required: true },
  aboutMe: { type: String, required: true },
  // rentLocation: { type: String, required: true },
  cities: Object,
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  smoke: { type: String, required: true },
  budgetRange: { type: [Number] },
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
