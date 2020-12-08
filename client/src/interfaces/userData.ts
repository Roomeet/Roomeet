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
