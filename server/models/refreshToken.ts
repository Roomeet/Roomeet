import { Schema, Document, model } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface RefreshTokenInterface extends Document {
  _id: string;
  email: string;
  token: string;
}

const RefreshTokenSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date
});

RefreshTokenSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default model<RefreshTokenInterface>('RefreshToken', RefreshTokenSchema);
