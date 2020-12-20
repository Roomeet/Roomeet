export interface MatchInterface extends Document {
  _id: string;
  users: string[];
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}