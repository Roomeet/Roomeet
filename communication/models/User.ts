import { Schema, Document, model } from 'mongoose';
import { ObjectID } from 'mongodb';

// Valid email address
const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Minimum eight characters, at least one letter and one number:
// const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export interface UserInterface extends Document {
  _id: string;
  name: string;
  lastName: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export interface userForMatch {
  id: string;
  name: string;
}

const userSchema = new Schema({
  _id: {
    type: ObjectID,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    // match: passwordRegexp,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: emailRegexp,
  },
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
});

userSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<UserInterface>('User', userSchema);