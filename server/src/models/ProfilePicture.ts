import { Schema, Document, model } from 'mongoose';
import { ObjectID } from 'mongodb';

export interface ProfilePictureInterface extends Document {
    _id: string;
    userId: string;
    file: {
        data: Buffer,
        ContentType: string
    };
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }

const ProfilePictureSchema = new Schema({
  _id: {
    type: ObjectID,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  file: {
    data: Buffer,
    ContentType: String
  },
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date
});

ProfilePictureSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default model<ProfilePictureInterface>('ProfilePicture', ProfilePictureSchema);
