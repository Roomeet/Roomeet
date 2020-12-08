export type UserDataFormResponse = {
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
}