import { Schema, Document, model } from 'mongoose';
import { ObjectID } from 'mongodb';

export interface MatchInterface extends Document {
  _id: string;
  users: string[];
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

function usersLimit(users: string[]): boolean {
  return users.length === 2;
}

const MatchSchema = new Schema({
  _id: {
    type: ObjectID,
    required: true,
  },
  users: {
    type: [String],
    required: true,
    validate: {
      validator: usersLimit,
      message: "A match can occur between two peoples only",
    },
  },
  canceled: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
});

MatchSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;  
    delete returnedObject.__v;
  }
});

export default model<MatchInterface>('Match', MatchSchema);
