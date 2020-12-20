import { Schema, Document, model } from 'mongoose';
import { ObjectId } from 'mongodb';

export type UserConnection = {
  userId: string;
  name: string;
  lastName: string;
  matchScore: number;
};

export interface Interaction extends Document {
  _id: string;
  userId: string;
  liked: UserConnection[];
  unLiked: UserConnection[];
  pending: UserConnection[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const InteractionsSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  liked: [Schema.Types.Mixed],
  unLiked: [Schema.Types.Mixed],
  pending: [Schema.Types.Mixed],
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
});

// ???
InteractionsSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = model<Interaction>('Interactions', InteractionsSchema);
