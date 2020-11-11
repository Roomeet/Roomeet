import { Schema, Document, model } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface User extends Document {
  _id: string;
  user_name: string;
  password: string;
  email: string;
  creation_time: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

const userSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  created_at: Date,
  updated_at: Date,
  deleted_at: Date,
});

// ???
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = model<User>('User', userSchema);
