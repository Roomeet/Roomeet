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
  id: string,
  userId: string,
  fullName: string,
  aboutMe: string,
  rentLocation: string,
  age: number,
  gender: string,
  smoke: boolean,
  pet: boolean,
  relationship?: boolean,
  employed?: boolean,
  numOfRoomates?: number,
  religion?: boolean,
  createdAt: Date,
  updatedAt: Date | null,
  deletedAt: Date | null,
}
