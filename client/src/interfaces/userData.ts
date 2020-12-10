type Smoke = 'Allways' | 'Sometime' | 'Never';

export type UserDataFormResponse = {
  userId: string;
  age: number;
  gender: string;
  smoke: Smoke;
  pet: boolean;
  relationship?: boolean;
  employed?: boolean;
  interests: string[];
  languages: string[];
  music: string[];
  lookingFor?: string[];
  numOfRoomates?: number;
  religion?: boolean;
}

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
