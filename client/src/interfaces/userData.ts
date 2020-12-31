type Smoke = 'Allways' | 'Sometime' | 'Never';

export type UserDataFormResponse = {
  userId: string;
  age: number;
  gender: string;
  smoke: Smoke;
  image: {
    data: Buffer,
    ContentType: string,
  };
  budgetRange?: number[],
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
  image: Buffer,
  rentLocation: string,
  age: number,
  gender: string,
  smoke: boolean,
  maxBudget: number,
  minBudget: number,
  pet: boolean,
  relationship?: boolean,
  employed?: boolean,
  numOfRoomates?: number,
  religion?: boolean,
  createdAt: Date,
  updatedAt: Date | null,
  deletedAt: Date | null,
}
