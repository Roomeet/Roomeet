import { Schema, Document, model } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface UserPreferencesInterface extends Document {
  _id: string;
  userId: string;
  ages: { top: number; bottom: number };
  genders: { male: boolean; female: boolean };
  smokes: boolean;
  pets: boolean;
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

const UserPreferenceSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  ages: { type: Schema.Types.Mixed },
  genders: { type: Schema.Types.Mixed },
  smokes: Boolean,
  pets: Boolean,
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
  deletedAt: Date
});

UserPreferenceSchema.set('toJSON', {
  transform: (document: any, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = model<UserPreferencesInterface>(
  'UserPreferences',
  UserPreferenceSchema
);
